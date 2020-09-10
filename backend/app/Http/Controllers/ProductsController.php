<?php

namespace App\Http\Controllers;

use App\ProductUnit;
use App\Product;
use App\ProductPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Helper\ResponseBuilder;

class ProductsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $fractal;

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * GET /products
     * 
     * @return array
     */
    public function index()
    {
        $product = Product::with('photos')->with('units')->get();

        if(count($product) > 0)
        {
            $status = 2;
            $message = "Products retrived succesfully";
        }
        else
        {
            $status = 3;
            $message = "Products not available";
        }
        return ResponseBuilder::result($status, $message, $product);
    }

    public function show($id)
    {
        $product = Product::where('id', '=', $id)->with('photos')->with('units')->get();

        if(count($product) > 0)
        {
            $status = 2;
            $message = "Product retrived succesfully";
        }
        else
        {
            $status = 3;
            $message = "Product not available";
        }
        return ResponseBuilder::result($status, $message, $product);
    }

    public function store(Request $request)
    {
        try {
            \DB::beginTransaction();
            //validate request parameters
            $this->validate($request, [
                'category' => 'max:255',
                'sub_category' => 'max:255',
                'code' => 'max:255',
                'name' => 'required|max:255',
                'description' => 'max:600',
                'tax' => 'max:255',
            ]);

            $product = new Product();
            $product->category = $request->category;
            $product->sub_category = $request->sub_category;
            $product->code = $request->code;
            $product->name = $request->name;
            $product->description = $request->description;
            $product->tax = $request->tax;
            $product->save();
            
            // save images
            foreach ($request->product_images as $key => $image) {
                $product_photo = new ProductPhoto();
                $product_photo->product_id = $product->id;

                if($image)
                {

                    $destinationPath = ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "uploads". DIRECTORY_SEPARATOR . "products". DIRECTORY_SEPARATOR;
                    $image_parts = explode(";base64,", $image);
                    $image_type_aux = explode("image/", $image_parts[0]);
                    $image_type = $image_type_aux[1];
                    $image_base64 = base64_decode($image_parts[1]);
                    $photo_name = uniqid() .'.'. $image_type;
                    $file = $destinationPath . $photo_name;
                    file_put_contents($file, $image_base64);
                    
                    $product_photo->photo_name = $photo_name;
                    $product_photo->photo_url = url('/uploads/products/'.$photo_name);


                } 
                $product_photo->save();
            }


            // // save units
            foreach ($request->product as $key => $product_unit) 
            {
                $productUnits = new ProductUnit();
                $productUnits->product_id = $product->id;
                $productUnits->units = $product_unit['unit'];
                $productUnits->mrp = $product_unit['mrp'];
                $productUnits->rate = $product_unit['rate'];
                $productUnits->moq = $product_unit['moq'];
                $productUnits->available = $product_unit['available'];
                $productUnits->stock = $product_unit['stock'];
                $productUnits->save();

            }
            \DB::commit();
            
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json(['message' => 'Something went wrong!'], 404);
        }
        
        $status = 2;
        $message = "Product saved succesfully";
        return ResponseBuilder::result($status, $message, $product);
        
    }

    public function update($id, Request $request)
    {
        
        
        try {
            \DB::beginTransaction();
            //validate request parameters
            $this->validate($request, [
                'category' => 'max:255',
                'sub_category' => 'max:255',
                'code' => 'max:255',
                'name' => 'required|max:255',
                'description' => 'max:600',
                'tax' => 'max:255',
            ]);

            $product = Product::find($id);
            $product->category = $request->category;
            $product->sub_category = $request->sub_category;
            //$product->code = $request->code;
            $product->name = $request->name;
            $product->description = $request->description;
            $product->tax = $request->tax;
            $product->save();
            
            $destinationPath = ".." . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "uploads". DIRECTORY_SEPARATOR . "products". DIRECTORY_SEPARATOR;

            // delete existing photos
            $product_photos = ProductPhoto::where('product_id', $id)->get();
            if($product_photos)
            {
                foreach ($product_photos as $key => $product_photo) 
                {
                    if(file_exists($destinationPath.$product_photo->photo_name))
                    {
                        unlink($destinationPath.$product_photo->photo_name); 
                    }
                    ProductPhoto::findOrFail($product_photo->id)->delete();
                }
            }


            //save images
            foreach ($request->product_images as $key => $image) 
            {
                if($image)
                {
                    $product_photo = new ProductPhoto();
                    $product_photo->product_id = $id;
                    $image_parts = explode(";base64,", $image);
                    $image_type_aux = explode("image/", $image_parts[0]);
                    $image_type = $image_type_aux[1];
                    $image_base64 = base64_decode($image_parts[1]);
                    $photo_name = uniqid() .'.'. $image_type;
                    $file = $destinationPath . $photo_name;
                    file_put_contents($file, $image_base64);
                    
                    $product_photo->photo_name = $photo_name;
                    $product_photo->photo_url = url('/uploads/products/'.$photo_name);
                    
                    $product_photo->save();
                } 
            }

            //delete the existing units.
            $productUnit = ProductUnit::where('product_id', $id)->get();
            if($productUnit)
            {
                foreach ($productUnit as $key => $unit) 
                {
                    ProductUnit::findOrFail($unit->id)->delete();
                }
            }

            // save units
            foreach ($request->product as $key => $product_unit) 
            {
                $productUnits = new ProductUnit();
                $productUnits->product_id = $id;
                $productUnits->units = $product_unit['unit'];
                $productUnits->mrp = $product_unit['mrp'];
                $productUnits->rate = $product_unit['rate'];
                $productUnits->moq = $product_unit['moq'];
                $productUnits->available = $product_unit['available'];
                $productUnits->stock = $product_unit['stock'];
                $productUnits->save();

            }
            \DB::commit();
            
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json(['message' => 'Something went wrong!'], 404);
        }
        
        $status = 2;
        $message = "Product updated succesfully";
        return ResponseBuilder::result($status, $message, $product);

       
    }

    public function destroy($id){
        
        //Return error 404 response if product was not found
        if(!Product::find($id)) return $this->errorResponse('Product not found!', 404);

        //Return 410(done) success response if delete was successful
        if(Product::find($id)->delete()){
            return $this->customResponse('Product deleted successfully!', 410);
        }

        //Return error 400 response if delete was not successful
        return $this->errorResponse('Failed to delete product!', 400);
    }

    public function customResponse($message = 'success', $status = 200)
    {
        return response(['status' =>  $status, 'message' => $message], $status);
    }
}