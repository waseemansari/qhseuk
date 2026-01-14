<?php

namespace App\Helpers;

use App\Models\{Student, Company, Invoice, Branch};
use Illuminate\Support\Facades\Auth;

class StudentHelper
{
    // Cache variables used in all functions
    protected static $branchId;
    protected static $branchCode;
    protected static $siteName;
    protected static $branchCurrency;

    // Initialize once
    protected static function init()
    {
        if (!self::$branchId) {
            self::$branchId = Auth::user()->branch_id;
            $branch = Branch::find(self::$branchId);
            self::$branchCode = $branch?->code ?? '';
            self::$branchCurrency = $branch?->currency ?? 'AED';
        }
    }

    public static function generateStudentNumber()
    {
        self::init();

        $max = Student::where('branch_id', self::$branchId)->max('student_number');
        $number = $max ? preg_replace('/[^0-9]/', '', $max) + 1 : 1;

        return self::$branchCode . sprintf('%06d', $number);
    }

    public static function generateCompanyNumber()
    {
        self::init();

        $max = Company::where('branch_id', self::$branchId)->max('company_number');
        $number = $max ? preg_replace('/[^0-9]/', '', $max) + 1 : 1;

        return self::$branchCode  . sprintf('%06d', $number);
    }

    public static function generatePaymentNumber()
    {
        self::init();

        $max = Invoice::where('branch_id', self::$branchId)->max('invoice_number');
        $number = $max ? preg_replace('/[^0-9]/', '', $max) + 1 : 1;

        return self::$branchCode . sprintf('%06d', $number);
    }
 
     public static function convertNumberToWord(float $number){
        self::init();
                   $decimal = round($number - ($no = floor($number)), 2) * 100;
                    $hundred = null;
                    $digits_length = strlen($no);
                    $i = 0;
                    $str = array();
                    $words = array(0 => '', 1 => 'one', 2 => 'two',
                        3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six',
                        7 => 'seven', 8 => 'eight', 9 => 'nine',
                        10 => 'ten', 11 => 'eleven', 12 => 'twelve',
                        13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen',
                        16 => 'sixteen', 17 => 'seventeen', 18 => 'eighteen',
                        19 => 'nineteen', 20 => 'twenty', 30 => 'thirty',
                        40 => 'forty', 50 => 'fifty', 60 => 'sixty',
                        70 => 'seventy', 80 => 'eighty', 90 => 'ninety');
                    $digits = array('', 'hundred','thousand','lakh', 'crore');
                    while( $i < $digits_length ) {
                        $divider = ($i == 2) ? 10 : 100;
                        $number = floor($no % $divider);
                        $no = floor($no / $divider);
                        $i += $divider == 10 ? 1 : 2;
                        if ($number) {
                            $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
                            $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
                            $str [] = ($number < 21) ? $words[$number].' '. $digits[$counter]. $plural.' '.$hundred:$words[floor($number / 10) * 10].' '.$words[$number % 10]. ' '.$digits[$counter].$plural.' '.$hundred;
                        } else $str[] = null;
                    }
                    $Rupees = implode('', array_reverse($str));
                    if($decimal > 9){
                        if($decimal % 10 == 0){
                            $fractionValue = 'Zero';
                        } else {
                            $fractionValue = $words[$decimal % 10];        
                        }
                        $decimalPoint = ($words[$decimal / 10] . " " . $fractionValue);
                    } else {
                        $decimalPoint = $words[$decimal];
                    }
                    //$paise = ($decimal) ? " " . ($words[$decimal / 10] . " " . $words[$decimal % 10]) . ' Fils Only' : ' No Fils Only';
                    $paise = ($decimal) ? $decimalPoint . '  Fils Only' : ' No Fils Only';

                    return ($Rupees ? ucwords($Rupees) . self::$branchCurrency.' And ' : '') . ucwords($paise) ;
   
      }
}
