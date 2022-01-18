<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\RoomRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class RoomCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Room::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/room');
        CRUD::setEntityNameStrings('чат', 'Чаты');
    }

    protected function setupListOperation()
    {
        CRUD::column('id')->label('№');
        CRUD::column('name')->label('Название');
    }

    protected function setupShowOperation()
    {
        CRUD::column('id')->label('№');
        CRUD::column('name')->label('Название');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(RoomRequest::class);

        CRUD::field('name')->label('Название');
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
