<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class MessageCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class MessageCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
//    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
//    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
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
//        CRUD::setValidation(MessageRequest::class);

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

//    public function edit($id)
//    {
//        $this->crud->hasAccessOrFail('update');
//        // get entry ID from Request (makes sure its the last ID for nested resources)
//        $id = $this->crud->getCurrentEntryId() ?? $id;
//        $this->crud->setOperationSetting('fields', $this->crud->getUpdateFields());
//        // get the info for that entry
//        $this->data['entry'] = $this->crud->getEntry($id);
//        $this->data['crud'] = $this->crud;
//        $this->data['saveAction'] = $this->crud->getSaveAction();
//        $this->data['title'] = $this->crud->getTitle() ?? trans('backpack::crud.edit').' '.$this->crud->entity_name;
//
//        $this->data['id'] = $id;
//
//        // load the view from /resources/views/vendor/backpack/crud/ if it exists, otherwise load the one in the package
//        return view($this->crud->getEditView(), $this->data);
//    }
//
//    public function update(MessageRequest $request)
//    {
////        $this->crud->hasAccessOrFail('update');
////
////        // execute the FormRequest authorization and validation, if one is required
////        $request = $this->crud->validateRequest();
////        unset($request['result']);
////        // update the row in the db
////        $item = $this->crud->update($request->get($this->crud->model->getKeyName()),
////                                    $this->crud->getStrippedSaveRequest());
////        $this->data['entry'] = $this->crud->entry = $item;
////
////        // show a success message
////        \Alert::success(trans('backpack::crud.update_success'))->flash();
////
////        // save the redirect choice for next time
////        $this->crud->setSaveAction();
//
//        $data = $request->all();
//        $validated = $request->validated();
////        dd($validated);
//        Message::findOrFail($data['id'])->update($validated);
//
//        return back();
//    }
}
