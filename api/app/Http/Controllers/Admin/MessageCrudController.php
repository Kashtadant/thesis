<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class MessageCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\Message::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/message');
        CRUD::setEntityNameStrings('сообщение', 'Сообщения');
        $this->crud->with('user');
    }

    protected function setupListOperation()
    {
        $this->crud->addColumns($this->getColumns());
    }

    protected function setupCreateOperation()
    {
        $this->crud->addFields($this->getFields());
    }

    protected function setupShowOperation(): void
    {
        $this->crud->addColumns($this->getColumns());
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    public function getColumns(): array
    {
        return [
            'id'           => [
                'name'  => 'id',
                'label' => '№',
            ],
            'user_id'      => [
                'name'  => 'user_id',
                'label' => 'Пользователь',
            ],
            'room_id'      => [
                'name'  => 'room_id',
                'label' => "Чат",
            ],
            'type'         => [
                'name'  => 'type',
                'label' => 'Тип',
            ],
            'votes'        => [
                'name'  => 'votes',
                'label' => 'Голоса',
            ],
            'participants' => [
                'name'  => 'participants',
                'label' => 'Участники',
            ],
            'text'         => [
                'name'  => 'text',
                'label' => 'Текст',
            ],
        ];
    }

    public function getFields(): array
    {
        return [
            'user_id'      => [
                'name'      => 'user_id',
                'label'     => 'Пользователь',
                'type'      => 'relationship',
                'entity'    => 'user',
                'attribute' => 'full_name',
            ],
            'room_id'      => [
                'name'      => 'room_id',
                'label'     => "Чат",
                'type'      => 'relationship',
                'entity'    => 'room',
                'attribute' => 'name',
            ],
            'type'         => [
                'name'  => 'type',
                'label' => 'Тип',
                'type'  => 'text',
            ],
            'votes'        => [
                'name'  => 'votes',
                'label' => 'Голоса',
                'type'  => 'text',
            ],
            'participants' => [
                'name'  => 'participants',
                'label' => 'Участники',
                'type'  => 'text',
            ],
            'text'         => [
                'name'  => 'text',
                'label' => 'Текст',
                'type'  => 'text',
            ],
        ];
    }
}
