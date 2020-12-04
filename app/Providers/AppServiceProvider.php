<?php

namespace App\Providers;

// use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();
        \PagSeguro\Library::initialize();
        \PagSeguro\Library::cmsVersion()->setName("Markteplace")->setRelease("1.0.0");
        \PagSeguro\Library::moduleVersion()->setName("Markteplace")->setRelease("1.0.0");
    }
}
