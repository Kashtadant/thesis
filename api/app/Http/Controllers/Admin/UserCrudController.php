<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class UserCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class UserCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\User::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/user');
        CRUD::setEntityNameStrings('пользователя', 'Пользователи');
    }

    protected function setupListOperation()
    {
        CRUD::column('full_name')->label('ФИО');
        CRUD::column('position')->label('Должность');
        CRUD::column('email');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(UserRequest::class);

        CRUD::field('full_name')->label('ФИО');
        CRUD::field('position')->label('Должность');
        CRUD::field('email');
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
