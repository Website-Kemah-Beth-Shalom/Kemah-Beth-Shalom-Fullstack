<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerBook;
use App\Models\CustomerBookMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function Index()
    {
        // $order = CustomerBookMaterial::with('customerBookMaterialItems')->get();

        // related Model:
        // CustomerBook, this also has realtion with Customer table
        // CustomerBookMaterial
        // CustomerBookMaterialItem

        // get all data from CustomerBook => CustomerBookMaterial => CustomerBookMaterialItem (add Customer relation)
        $order = CustomerBook::with('customerBookMaterials.customerBookMaterialItems')
            // join customer table
            ->join('customers', 'customers.id', '=', 'customerbooks.customer_id')

            // join product table

            // ->join('products', 'products.id', '=', 'customerbooks.')
            // order by
            // ->orderBy('customerbooks.created_at', 'desc')
            ->get();

        return inertia('Admin/Order/AdminOrderPage', [
            'Orders' => $order,
        ]);
    }
}
