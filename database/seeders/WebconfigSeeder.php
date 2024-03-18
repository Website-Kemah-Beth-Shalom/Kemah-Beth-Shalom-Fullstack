<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebconfigSeeder extends Seeder
{

    public function run(): void
    {
        $webconfig = DB::table('webconfigs');
        $webconfig->truncate(); //clear all data from table

        $data = [
            // General

            // placeholder_image
            [
                'category' => 'general',
                'title' => 'placeholder_image',
                'alias' => 'Gambar Placeholder',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
            ],
            [
                'category' => 'general',
                'title' => 'url',
                'alias' => 'Domain Web Perusahaan',
                'type' => 'text',
                'value' => 'https://kemahbethshalom.renara.biz.id/',
            ],
            [
                'category' => 'general',
                'title' => 'company_name',
                'alias' => 'Nama Perusahaan',
                'type' => 'text',
                'value' => 'Kemah Beth Shalom',
            ],
            [
                'category' => 'general',
                'title' => 'company_description',
                'alias' => 'Deskripsi Perusahaan',
                'type' => 'textarea',
                'value' => 'A creative agency that build awesome stuff all day, every day.',
            ],
            [
                'category' => 'general',
                'title' => 'address',
                'alias' => 'Alamat Perusahaan',
                'type' => 'text',
                'value' => 'Gang Mushola Nurul Amal Jalan Ciater Rawa Mekar Jaya No.14, Kecamatan Serpong, Kota Tangerang Selatan, Banten, Indonesia',
            ],
            [
                'category' => 'general',
                'title' => 'company_history',
                'alias' => 'Sejarah Perusahaan',
                'type' => 'textarea',
                'value' => 'Renara adalah agency yang bergerak di bidang penyedia layananan digital',
            ],
            [
                'category' => 'general',
                'title' => 'company_date_established',
                'alias' => 'Tanggal Perusahaan Berdiri',
                'type' => 'text',
                'value' => '01 Januari 2021',
            ],
            [
                'category' => 'general',
                'title' => 'company_vision',
                'alias' => 'Visi Perusahaan',
                'type' => 'text',
                'value' => 'Menjadi perusahaan yang terpercaya dan terbaik di bidangnya',
            ],
            [
                'category' => 'general',
                'title' => 'company_mission',
                'alias' => 'Misi Perusahaan',
                'type' => 'text',
                'value' => 'Membangun kepercayaan pelanggan dengan memberikan pelayanan terbaik',
            ],
            [
                'category' => 'general',
                'title' => 'company_logo',
                'alias' => 'Logo Perusahaan',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'general',
                'title' => 'company_bank_name',
                'alias' => 'Nama Bank Perusahaan',
                'type' => 'text',
                'value' => 'BCA',
            ],
            [
                'category' => 'general',
                'title' => 'company_bank_account_name',
                'alias' => 'Nama Akun Bank Perusahaan',
                'type' => 'text',
                'value' => 'Yay. Shekinah Glory',
            ],
            [
                'category' => 'general',
                'title' => 'company_bank_account_number',
                'alias' => 'Nomor Akun Bank Perusahaan',
                'type' => 'text',
                'value' => '833 - 002 - 7003',
            ],
            [
                'category' => 'general',
                'title' => 'company_donation_link',
                'alias' => 'Link Donasi Perusahaan',
                'type' => 'text',
                'value' => 'https://m.benihbaik.com/campaign/bantu-panti-beth-shalom',
            ],
            // Home
            [
                'category' => 'home',
                'title' => 'home_banner',
                'alias' => 'Banner Halaman Utama',
                'type' => 'image',
                // generate random placeholder image
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'home_hero_title',
                'alias' => 'Judul pada bagian Hero Halaman Utama',
                'type' => 'text',
                'value' => 'Kemah Beth Shallom.',

            ],
            [
                'category' => 'home',
                'title' => 'home_hero_subtitle',
                'alias' => 'Sub-judul pada bagian Hero Halaman Utama',
                'type' => 'text',
                'value' => 'Panti Werdha & Panti Asuhan.',

            ],
            [
                'category' => 'home',
                'title' => 'home_hero_description',
                'alias' => 'Deskripsi pada bagian Hero Halaman Utama',
                'type' => 'textarea',
                'value' => 'Kemah Beth Shalom adalah tempat berteduh bagi omah-opah dan anak-anak muda dari berbagai daerah serta disekolahkan disini untuk menjadi berkat didaerah asal mereka.',

            ],
            [
                'category' => 'home',
                'title' => 'home_hero_verse_title',
                'alias' => 'Judul Ayat pada bagian Hero Halaman Utama',
                'type' => 'text',
                'value' => 'Matius 25:35',
            ],
            [
                'category' => 'home',
                'title' => 'home_hero_verse',
                'alias' => 'Ayat pada bagian Hero Halaman Utama',
                'type' => 'textarea',
                'value' => 'Sebab Aku lapar, dan kamu memberi Aku makan; Aku haus, dan kamu memberi Aku minum; Aku adalah orang asing, dan kamu menjamu Aku; Aku telanjang, dan kamu memberi Aku pakaian; Aku sakit, dan kamu menjenguk Aku; Aku di dalam penjara, dan kamu mengunjungi Aku.',
            ],
            [
                'category' => 'home',
                'title' => 'home_hero_quote',
                'alias' => 'Text pada bagian Hero Halaman Utama',
                'type' => 'textarea',
                'value' => 'This is wise wording, This is wise wording, This is wise wording',

            ],
            [
                'category' => 'home',
                'title' => 'home_banner_description',
                'alias' => 'Deskripsi Banner pada Halaman Utama',
                'type' => 'textarea',
                'value' => 'We create innovative and functional designs.',

            ],
            [
                'category' => 'home',
                'title' => 'home_about_description',
                'alias' => 'Deskripsi pada bagian About Halaman Utama',
                'type' => 'textarea',
                'value' => 'We are a team of talented designers making websites with Bootstrap',
            ],
            [
                'category' => 'home',
                'title' => 'home_about_quote',
                'alias' => 'Quote pada bagian About Halaman Utama',
                'type' => 'text',
                'value' => '“Design is not just what it looks like and feels like. Design is how it works.”',
            ],
            [
                'category' => 'home',
                'title' => 'home_works_title',
                'alias' => 'Judul pada bagian Works Halaman Utama',
                'type' => 'text',
                'value' => 'Some of our works',
            ],
            [

                'category' => 'home',
                'title' => 'home_works_description',
                'alias' => 'Deskripsi pada bagian Works Halaman Utama',
                'type' => 'textarea',
                'value' => 'We are a team of talented designers making websites with Bootstrap',
            ],
            // Gallery / Documentation
            [
                'category' => 'gallery',
                'title' => 'gallery_title',
                'alias' => 'Judul Halaman Gallery',
                'type' => 'text',
                'value' => 'Dokumentasi',
            ],
            [
                'category' => 'gallery',
                'title' => 'gallery_description',
                'alias' => 'Deskripsi Halaman Gallery',
                'type' => 'textarea',
                'value' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ],
            // Cost
            [
                'category' => 'cost',
                'title' => 'cost_title',
                'alias' => 'Judul Halaman Cost',
                'type' => 'text',
                'value' => 'Cost Estimator',
            ],
            [
                'category' => 'cost',
                'title' => 'cost_description',
                'alias' => 'Deskripsi Halaman Cost',
                'type' => 'textarea',
                'value' => 'Berikut merupakan estimasi biaya yang dibutuhkan untuk membangun rumah anda. Masukkan data yang dibutuhkan untuk mendapatkan estimasi biaya yang lebih akurat.',
            ],
            // Blog
            [
                'category' => 'blog',
                'title' => 'blog_title',
                'alias' => 'Judul Halaman Blog',
                'type' => 'text',
                'value' => 'Blog',
            ],
            [
                'category' => 'blog',
                'title' => 'blog_description',
                'alias' => 'Deskripsi Halaman Blog',
                'type' => 'textarea',
                'value' => 'Informasi terbaru mengenai Kemah Beth Shallom',
            ],
            // Contact
            [
                'category' => 'contact',
                'title' => 'company_phone_number',
                'alias' => 'Nomor Telepon Perusahaan',
                'type' => 'text',
                'value' => '0877 7428 8670',
            ],
            [
                'category' => 'contact',
                'title' => 'company_email',
                'alias' => 'Alamat Email Perusahaan',
                'type' => 'text',
                'value' => 'kemahbethshalom@gmail.com',
            ],
            [
                'category' => 'contact',
                'title' => 'company_whatsapp',
                'alias' => 'Whatsapp Perusahaan',
                'type' => 'text',
                'value' => '08219239293293',
            ],
            [
                'category' => 'contact',
                'title' => 'company_instagram',
                'alias' => 'Link Instagram Perusahaan',
                'type' => 'text',
                'value' => 'kemahbethshalom',
            ],
            [
                'category' => 'contact',
                'title' => 'company_youtube',
                'alias' => 'Link Youtube Perusahaan',
                'type' => 'text',
                'value' => '@gbiintermarkbsd',
            ],


            // About
            [
                'category' => 'home',
                'title' => 'about_title',
                'alias' => 'Judul Halaman About',
                'type' => 'text',
                'value' => 'About',
            ],
            [
                'category' => 'home',
                'title' => 'about_who_us_title',
                'alias' => 'Judul Who Us Halaman About',
                'type' => 'text',
                'value' => 'Siapa Kami',
            ],
            [
                'category' => 'home',
                'title' => 'about_who_us_description',
                'alias' => 'Deskripsi Who Us Halaman About',
                'type' => 'textarea',
                'value' => 'Tempat tinggal para lansia dan anak-anak asuh yang mengalami berbagai hal dalam hidup sehingga menyebabkan mereka harus berpisah jauh dari keluarga; Tuhanlah yang mempertemukan kami. Kami Yayasan Shekinah Glory, hadir sebagai wadah institusi “Senior Living and The Orphanage Ministries” secara hukum dan resmi berizin, tercatat di negara sebagai Panti Wreda dan Panti Asuhan Kemah Beth Shalom',
            ],
            [
                'category' => 'home',
                'title' => 'about_who_us_image_first',
                'alias' => 'Gambar Pertama Who Us Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_who_us_image_second',
                'alias' => 'Gambar Kedua Who Us Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            // about_vision_title
            [
                'category' => 'home',
                'title' => 'about_vision_title',
                'alias' => 'Judul Visi Halaman About',
                'type' => 'text',
                'value' => 'Visi Kami',
            ],
            // about_vision_description
            [
                'category' => 'home',
                'title' => 'about_vision_description',
                'alias' => 'Deskripsi Visi Halaman About',
                'type' => 'textarea',
                'value' => 'Menjadikan wadah Rumah Pemerhati Kemah Beth Shalom atau “Rumah Damai” sebagai komunitas, tempat untuk berteduh, bertumbuh bagi anak-anak & usia emas lansia yang didasari Kasih, dihidupi Kasih dan mengamalkan Kasih sehingga mampu berdampak bagi Negara ini.',
            ],
            [
                'category' => 'home',
                'title' => 'about_vision_image_first',
                'alias' => 'Gambar Pertama Visi Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_vision_image_second',
                'alias' => 'Gambar Kedua Visi Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_vision_image_third',
                'alias' => 'Gambar Ketiga Visi Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_mission_title',
                'alias' => 'Judul Misi Halaman About',
                'type' => 'text',
                'value' => 'Misi Kami',
            ],
            [
                'category' => 'home',
                'title' => 'about_mission_description',
                'alias' => 'Deskripsi Misi Halaman About',
                'type' => 'textarea',
                'value' => 'Menyediakan dukungan, hunian yang akrab dan kekeluargaan yang aman bagi para usia emas lansia dan belia.',
            ],
            [
                'category' => 'home',
                'title' => 'about_mission_image_first',
                'alias' => 'Gambar Pertama Misi Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_mission_image_second',
                'alias' => 'Gambar Kedua Misi Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_how_we_serve_title',
                'alias' => 'Judul How We Serve Halaman About',
                'type' => 'text',
                'value' => 'How We Serve',
            ],
            [
                'category' => 'home',
                'title' => 'about_how_we_serve_description',
                'alias' => 'Deskripsi How We Serve Halaman About',
                'type' => 'textarea',
                'value' => 'Kami menjadikan para usia emas lansia dan belia sebagai keluarga besar yang berhak untuk menerima setiap ekspresi Kasih yang sudah dituangkan ke dalam program-program yang kami persiapkan guna membawa mereka ke tingkat kehidupan yang lebih layak.',
            ],
            [
                'category' => 'home',
                'title' => 'about_how_we_serve_image',
                'alias' => 'Gambar Pertama How We Serve Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_donation_title',
                'alias' => 'Judul Donation Halaman About',
                'type' => 'text',
                'value' => 'Mau Berdonasi?',
            ],
            [
                'category' => 'home',
                'title' => 'about_donation_description',
                'alias' => 'Deskripsi Donation Halaman About',
                'type' => 'textarea',
                'value' => 'Saudara/saudari sekalian dapat memberikan donasi melalui: ',
            ],
            [
                'category' => 'home',
                'title' => 'about_donation_thankyou_description',
                'alias' => 'Deskripsi Terima Kasih Donation Halaman About',
                'type' => 'textarea',
                'value' => 'Terima kasih atas dukungan dari pada donatur yang sudah terus menabur untuk Kemah bethshalom sehingga Kemah Bethshalom bisa terus memberkati omah-opah & anak-anak ditempat ini.',
            ],
            // about_last_donation_title
            [
                'category' => 'home',
                'title' => 'about_last_donation_title',
                'alias' => 'Judul Bagian Donasi Terakhir Halaman About',
                'type' => 'text',
                'value' => 'Donasi Terakhir Kami',
            ],
            [
                'category' => 'home',
                'title' => 'about_last_donation_screen_shot',
                'alias' => 'Gambar Screenshot Donasi Terakhir Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_last_donation_image',
                'alias' => 'Gambar Pendukung Donasi Terakhir Halaman About',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            // Aniversary
            [
                'category' => 'home',
                'title' => 'about_aniversary_title',
                'alias' => 'Judul Bagian Aniversary',
                'type' => 'text',
                'value' => '10 Tahun Anniversary',
            ],
            [
                'category' => 'home',
                'title' => 'about_aniversary_image',
                'alias' => 'Gambar Bagian Aniversary',
                'type' => 'image',
                'value' => 'https://picsum.photos/1920/1080',
            ],
            [
                'category' => 'home',
                'title' => 'about_aniversary_description',
                'alias' => 'Deskripsi Halaman Aniversary',
                'type' => 'textarea',
                'value' => 'Tepat tanggal 11 Mei 2023, Kemah Beth Shalom memasuki umur 10 tahun, dan begitu banyak dirasakan campur tangan dan pertolongan Tuhan untuk Kemah Beth Shalom, terlebih untuk opah omah dan anak-anak yang tinggal di Kemah Beth Shalom. Dan kami mengucap syukur atas setiap pertolongan Tuhan untuk Kemah Beth Shalom ini, biar terus Kemah Beth Shalom dapat menjadi saluran berkat bagi banyak orang.',
            ],

            // Location
            [
                'category' => 'home',
                'title' => 'about_location_title',
                'alias' => 'Deskripsi Halaman Location',
                'type' => 'text',
                'value' => 'Lokasi Kami',
            ],
            // video
            [
                'category' => 'video',
                'title' => 'video_title',
                'alias' => 'Judul  Halaman Video',
                'type' => 'text',
                'value' => 'Video',
            ],
            [
                'category' => 'video',
                'title' => 'video_description',
                'alias' => 'Deskripsi Halaman Video',
                'type' => 'textarea',
                'value' => 'Video dokumentasi kegiatan Kemah Beth Shalom',
            ],
            // Footer
            [
                'category' => 'footer',
                'title' => 'footer_copyright',
                'alias' => 'Copyright pada Footer',
                'type' => 'text',
                'value' => 'Yayasan Shekinah Glory',
            ],
            [
                'category' => 'footer',
                'title' => 'footer_description',
                'alias' => 'Deskripsi pada Footer',
                'type' => 'text',
                'value' => 'Yayasan Shekinah Glory',
            ],
        ];

        $webconfig->insert($data); //insert batch data to database table (webconfigs)
        // php artisan migrate:fresh --seed --seeder=WebconfigSeeder
    }
}
