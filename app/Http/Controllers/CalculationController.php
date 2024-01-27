<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailJob;
use App\Models\Customer;
use App\Models\CustomerBook;
use App\Models\CustomerBookMaterial;
use App\Models\CustomerBookMaterialItem;
use App\Models\Product;
use App\Models\UserCartProduct;
use App\Models\Webconfig;
use App\Notifications\EmailNotif;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class CalculationController extends Controller
{

    // return /cost
    public function Index()
    {
        // $product = Product::with('productmaterial.productmaterialitems')->get();
        $product = Cache::rememberForever('product', function () {
            return Product::with('productmaterial.productmaterialitems')->get();
        });
        return Inertia(
            'Pricing/CostEstimatorPage',
            [
                'Products' => $product,
            ]
        );
    }

    public function SubmitCostPage()
    {
        $webconfig = Webconfig::all();
        return Inertia(
            'Pricing/SubmitPricingPage',
            [
                'Webconfig' => $webconfig,
            ]
        );
    }

    public function SubmitData(Request $request)
    {

        Validator::validate($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'nullable',
            'note' => 'nullable',
        ]);

        try {
            $customer = Customer::where('email', $request->email)->first(); // check whether customer already exist or not

            // begin transaction
            DB::beginTransaction();

            // if customer already exist, update customer data
            if ($customer) {
                $customer->name = $request->name;
                $customer->phone = $request->phone;
                $customer->address = $request->address;
                $customer->save();
            } else {
                $customer = Customer::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                ]);
            }

            // save data to customerbook
            $customerBook = CustomerBook::create([
                'customer_id' => $customer->id,
                'note' => $request->note,
            ]);



            // [Cart Logic]
            // save data from $request->cart
            $arr_cart = []; // we will save this array to model "CustomerBookMaterial"
            // instead of looping $request->cart, we can use array_map to save data to $arr_cart
            foreach ($request->cart as $cart) {
                $arr_cart[] = [
                    'id' => Uuid::uuid4(),
                    'customerbook_id' => $customerBook->id,
                    // Name of the Product (ex: Kasur)
                    // 'name' => $cart['name'], // from frontend haven't been implemented yet
                    'name' => "Kasur",
                    'width' => $cart['width'],
                    'length' => $cart['length'],
                    // 'height' => $cart['height'], // height might me not needed
                ];
            }

            // console log request
            // Log::info('arr cart', $arr_cart);
            // exit;

            CustomerBookMaterial::insert($arr_cart);

            // for each customerbookmaterial, save data afrom $request->cart[i]['material_id']
            // $arr_cart_material = []; // we will save this array to model "CustomerBookMaterialItem"
            // foreach ($customerBookMaterial as $item) {
            // }

            // save data afrom $request->cart[i]['material_id']
            $arr_cart_material = []; // we will save this array to model "CustomerBookMaterialItem"
            foreach ($arr_cart as $cart) {
                $count = 0;
                $arr = $request->cart[$count]['material_id'];
                foreach ($arr as $item) {

                    $arr_cart_material[] = [
                        'name' => 'King Koil',
                        'customerbookmaterial_id' => $cart['id'],
                        'productmaterialitem_id' => $item,
                        // harusnya nanti di tambahin nama
                    ];
                }
                $count++;
            }
            // Last step, save data to CustomerBookMaterialItem
            CustomerBookMaterialItem::insert($arr_cart_material);

            // [Email Logic]
            // send email to customer
            dispatch(new SendEmailJob([ // dispatch job to queue email
                'email' => $customer->email,
                'subject' => 'Hi ' . $customer->name . '! ' . 'Your order has successfully been placed!',
                'title' => 'Congratulations! Your order has successfully been placed!',
                'body' => 'We will contact you soon to confirm your order.',
            ]));

            // send email to admin
            // dispatch(new SendEmailJob([ // dispatch job to queue email
            //     'email' => Webconfig::where('name', 'admin_email')->first()->value,
            //     'subject' => 'New Order from ' . $customer->name,
            //     'title' => 'New Order from ' . $customer->name,
            //     'body' => 'Please check your admin panel to confirm the order.',
            // ]));

            DB::commit();
            return response()->json([
                'status' => 'success',
                'data' => $customer->with('customerbooks')->get(),
                'message' => 'Email sent',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); // rollback if error
            return response()->json([
                'status' => 'error',
                'error' => $e->getMessage(),
                'message' => 'Something went wrong',
            ], 400);
        }
    }
}
