<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Auth;
use App\Models\Branch;
class ImageUploadHelper
{
    public static function uploadAndResize($file, $folder, $width = null, $height = null)
    {
        $branch_id = Auth::user()->branch_id ?? 0;
        $branch_name = Branch::find($branch_id)?->name;
        $crm_folder = config('custom.crm_folder');
        $extension = strtolower($file->getClientOriginalExtension());
        $filename = Str::random(10) . '.' . $extension;
        $path = "{$branch_name}/{$crm_folder}/{$folder}/{$filename}";
 
        // Allowed image extensions
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        if (in_array($extension, $imageExtensions)) {
            // Process image with Intervention
            $image = Image::make($file);

            if ($width && $height) {
                $image->fit($width, $height);
            } elseif ($width) {
                $image->resize($width, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
            }

            $imageStream = $image->stream()->__toString();
            Storage::disk('spaces')->put($path, $imageStream, 'public');
        } else {
            // For non-image files (PDF, DOC, DOCX, XLSX, etc.)
            Storage::disk('spaces')->putFileAs("{$crm_folder}/{$folder}", $file, $filename, 'public');
        }

        return $path;
    }
}
