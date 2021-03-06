<?php


namespace App\Http\Controllers\Search;

use App\Api\ISBNdb;
use App\Traits\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class ISBNdbAPIController  extends Controller
{
    use ApiResponse;

    protected $ISBNdb;

    public function __construct() {

        $this->ISBNdb = new ISBNdb();
    }

    /**
     * Display a listing of book from Goodreads api matching query.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(!request()->query('search')){
            return $this->apiFail(['message' => "Please provide search param query string e.g. ?search=harry+potter"]);
        }

        if(!request()->query('search')){
            return $this->apiFail(['message' => "Please provide search param query string e.g. ?search=harry+potter"]);
        }

        $page = request()->query('page') ? (int)request()->query('page') : 1;

        $search = $this->urlFormatSearchParam(request()->query('search'));

        return Cache::remember("ISBNdb.search.{$search}.{$page}", 1440, function () use($search, $page) {
            return $this->ISBNdb->searchBooks($search, $page);
        });
    }
    private function urlFormatSearchParam($search)
    {
        if(!$search){
            return false;
        }
        return str_replace(' ', '+', $search);
    }
}