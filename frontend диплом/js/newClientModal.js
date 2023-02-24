// Переменные формы нового клиента
export function modalNewClient() {
    const $addClient = document.querySelector('.clients__add-client')
    const $clientAddForm = document.querySelector('.form__wrapper')
    const $clientAddFromClose = document.querySelector('.form__button-close')
    const $clientAddFormCancel = document.querySelector('.form__delete')
    const $clientAddLastName = document.querySelector('.form-client__lastname')
    const $clientAddName = document.querySelector('.form-client__name')
    const $clientAddSecondName = document.querySelector('.form-client__secondname')
    const $saveClient = document.querySelector('.form__save')
    const $contactName = document.querySelector('.form-client__contact-item')
    const $contactValue = document.querySelector('.form-client__phone')
    const $addContactButton = document.querySelector('.form__add-contact')
    return {
        $addClient,
        $clientAddForm,
        $clientAddFromClose,
        $clientAddLastName,
        $clientAddName,
        $clientAddName,
        $clientAddSecondName,
        $saveClient,
        $contactName,
        $contactValue,
        $addContactButton,
        $clientAddFormCancel
    }
}