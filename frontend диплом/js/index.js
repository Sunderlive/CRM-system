import { createContact } from "./contacts.js"
import { getData, addNewClient, changeClient, deleteClients, getDataById } from './data.js'
import { modalNewClient } from "./newClientModal.js"

const $tableBody = document.querySelector('.clients__table-body')
const modalBackground = document.querySelector('.modal-wrapper')// затенение при открытии модального окна

// Очистка таблицы значений
function clearTable() {
    $tableBody.innerHTML = ''
}
function clearContacts() {
    const contactItemsScore = document.querySelectorAll('.form-client__container')
    if (contactItemsScore) {
        for (let x = 0; x < contactItemsScore.length; x++) {
            let contactItems = document.querySelector('.form-client__container')
            let parent = document.querySelector('.form-client__wrapper')
            parent.removeChild(contactItems)
        }
    }
}
function clearContactsChange() {
    const contactItemsScore = document.querySelectorAll('.form-client__container')
    if (contactItemsScore) {
        for (let x = 0; x < contactItemsScore.length; x++) {
            let contactItems = document.querySelector('.form-client__container')
            let parent = document.querySelector('.form-change__wrapper-contact')
            parent.removeChild(contactItems)
        }
    }
}

function changeVariables() {
    const changeFormId = document.querySelector('.form-change__id')
    const changeLastname = document.querySelector('.form-change__client-lastname')
    const changeName = document.querySelector('.form-change__client-name')
    const changeSecondname = document.querySelector('.form-change__client-secondname')
    const changeFromConfirm = document.querySelector('.form-change__wrapper')
    const changeFormClose = document.querySelector('.form-change__button-close')
    const changeFormSave = document.querySelector('.form-change__save')
    return {
        changeFormId,
        changeLastname,
        changeName,
        changeSecondname,
        changeFromConfirm,
        changeFormClose,
        changeFormSave
    }
}

// СОЗДАНИЕ ДЕРЕВА ДЛЯ СТРОКИ КЛИЕНТА
function createClientDom(item) {
    const vkSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7">
    <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
    </g>
    </svg>`
    const mailSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
    </svg>
    `
    const fbSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7">
    <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
    </g>
    </svg>
    `
    const phoneSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7">
    <circle cx="8" cy="8" r="8" fill="#9873FF"/>
    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
    </g>
    </svg>`
    const additionalPhoneSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
    </svg>
    `
    const changeButtonSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clip-path="url(#clip0_224_1347)">
    <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_224_1347">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>`
    const deleteButtonSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clip-path="url(#clip0_224_1352)">
    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
    </g>
    <defs>
    <clipPath id="clip0_224_1352">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>`

    const $tableBodyTr = document.createElement('tr')
    $tableBodyTr.classList.add('clients__table-body-tr')
    $tableBody.append($tableBodyTr)
    const $tableTdId = document.createElement('td')
    const $tableTdName = document.createElement('td')
    const $tableTdDate = document.createElement('td')
    const $tableTdDateChange = document.createElement('td')
    const $tableTdContacts = document.createElement('td')
    const $tableTdActions = document.createElement('td')
    const $clientsBtnChange = document.createElement('button')
    const $clientsBtnDelete = document.createElement('button')
    const $clientsTimeSpanCreated = document.createElement('span')
    const $clientsTimeSpanUpdated = document.createElement('span')

    $tableBodyTr.id = item.id
    $clientsBtnDelete.dataset.clientId = item.id
    $clientsBtnChange.dataset.clientId = item.id
    $tableTdContacts.classList.add('clients__contacts')
    $clientsBtnChange.classList.add('clients__btn-change', 'btn-reset')
    $tableTdId.classList.add('clients__id')
    $tableTdName.classList.add('clients__name')
    $tableTdDate.classList.add('clients__date')
    $clientsTimeSpanCreated.classList.add('clients__date-span')
    $tableTdDateChange.classList.add('clients__change-date')
    $clientsTimeSpanUpdated.classList.add('clients__change-date-span')
    $clientsBtnDelete.classList.add('clients__btn-delete', 'btn-reset')
    $tableTdActions.classList.add('clients__contacts-wrapper')
    $tableTdId.textContent = item.id
    $tableTdName.textContent = `${item.surname} ${item.name} ${item.lastName}`
    $tableTdDate.textContent = `${new Date(item.createdAt).toLocaleDateString()}  `
    $clientsTimeSpanCreated.textContent = `${new Date(item.createdAt).toLocaleTimeString()}`
    $tableTdDateChange.textContent = `${new Date(item.updatedAt).toLocaleDateString()} ` //item.updatedAt
    $clientsTimeSpanUpdated.textContent = `${new Date(item.updatedAt).toLocaleTimeString()}`

    $clientsBtnChange.innerHTML = `${changeButtonSvg} Изменить`
    $clientsBtnDelete.innerHTML = `${deleteButtonSvg} Удалить`
    $tableBodyTr.append($tableTdId)
    $tableBodyTr.append($tableTdName)
    $tableBodyTr.append($tableTdDate)
    $tableBodyTr.append($tableTdDateChange)
    $tableBodyTr.append($tableTdContacts)
    for (let x = 0; x < item.contacts.length; x++) {
        switch (item.contacts[x].type) {
            case 'Телефон':
                const $clientContactPhone = document.createElement('span')
                $clientContactPhone.classList.add('clients__contacts-icons')
                $clientContactPhone.innerHTML = phoneSvg
                tippy($clientContactPhone, {
                    content: `Телефон: ${item.contacts[x].value}`,
                    placement: 'top',
                })
                $tableTdContacts.append($clientContactPhone)
                break
            case 'Доп. телефон':
                const $clientContactAdditionalPhone = document.createElement('span')
                $clientContactAdditionalPhone.classList.add('clients__contacts-icons')
                $clientContactAdditionalPhone.innerHTML = additionalPhoneSvg
                tippy($clientContactAdditionalPhone, {
                    content: `Доп. телефон: ${item.contacts[x].value}`,
                    placement: 'top',
                })
                $tableTdContacts.append($clientContactAdditionalPhone)
                break
            case 'Email':
                const $clientContactMail = document.createElement('span')
                $clientContactMail.classList.add('clients__contacts-icons')
                $clientContactMail.innerHTML = mailSvg
                tippy($clientContactMail, {
                    content: `Email: ${item.contacts[x].value}`,
                    placement: 'top',
                })
                $tableTdContacts.append($clientContactMail)
                break
            case 'Vk':
                const $clientContactVk = document.createElement('span')
                $clientContactVk.classList.add('clients__contacts-icons')
                $clientContactVk.innerHTML = vkSvg
                tippy($clientContactVk, {
                    content: `Vk: ${item.contacts[x].value}`,
                    placement: 'top',
                })
                $tableTdContacts.append($clientContactVk)
                break
            case 'Facebook':
                const $clientContactFb = document.createElement('span')
                $clientContactFb.classList.add('clients__contacts-icons')
                $clientContactFb.innerHTML = fbSvg
                tippy($clientContactFb, {
                    content: `Facebook: ${item.contacts[x].value}`,
                    placement: 'top',
                })
                $tableTdContacts.append($clientContactFb)
                break
        }
    }
    $tableBodyTr.append($tableTdActions)
    $tableTdActions.append($clientsBtnChange)
    $tableTdActions.append($clientsBtnDelete)
    $tableTdDate.append($clientsTimeSpanCreated)
    $tableTdDateChange.append($clientsTimeSpanUpdated)

    return {
        $tableBody,
        $tableBodyTr,
        $tableTdId,
        $tableTdName,
        $tableTdDate,
        $tableTdDateChange,
        $tableTdActions,
        $clientsBtnChange,
        $clientsBtnDelete,
    }
}
// кнопки удаления и отмены в форме удаления клиента
const deleteCancel = document.querySelector('.form-delete__delete-cancel')
deleteCancel.addEventListener('click', function () {
    deleteFormConfirm.classList.remove('form-delete__wrapper--active')
    modalBackground.classList.remove('modal-wrapper--active')
})
const deleteFormConfirm = document.querySelector('.form-delete__wrapper')
const deleteClose = document.querySelector('.form-delete__button-close')
deleteClose.addEventListener('click', function () {
    deleteFormConfirm.classList.remove('form-delete__wrapper--active')
    modalBackground.classList.remove('modal-wrapper--active')
})

// Функция удаления и открытия модального окна
function confirmDelete(clientCreate, item) {
    clientCreate.$clientsBtnDelete.addEventListener('click', function () {
        const buttonDeleteId = clientCreate.$clientsBtnDelete.getAttribute('data-client-id')
        const deleteFormConfirm = document.querySelector('.form-delete__wrapper')
        deleteFormConfirm.dataset.clientId = item.id
        deleteFormConfirm.classList.toggle('form-delete__wrapper--active')
        modalBackground.classList.add('modal-wrapper--active')
        deleteClient.dataset.targetId = buttonDeleteId
        deleteClient.dataset.clientId = buttonDeleteId
    })
}

// Кнопка удаления в удалении клиента 
const deleteClient = document.querySelector('.form-delete__delete-btn')
deleteClient.addEventListener('click', async function () {
    const deleteFormConfirm = document.querySelector('.form-delete__wrapper')
    deleteClients(deleteClient.dataset.clientId)  // функция удаления из БД
    const row = document.getElementById(deleteClient.dataset.clientId) // удаляет по id строку с клиентом улетевшего из БД
    row.parentElement.removeChild(row)
    deleteFormConfirm.classList.remove('form-delete__wrapper--active')
    modalBackground.classList.remove('modal-wrapper--active')
})

const $addContactButton = document.querySelector('.form-change__add-contact')
const contactWrapper = '.form-change__wrapper-contact'
const contactButton = '.form-change__add-contact'
const contactItems = document.getElementsByClassName('form-client__container')
$addContactButton.addEventListener('click', function (e) {
    e.preventDefault()
    if (contactItems.length < 9) {
        const contactItem = createContact(contactWrapper, contactButton)
    }
    else {
        const contactItem = createContact(contactWrapper, contactButton)
        $addContactButton.style = 'display: none;'
    }
})

// Кнопка удаления в изменении клиента
const changeDeleteClient = document.querySelector('.form-change__delete')
changeDeleteClient.addEventListener('click', function (e) {
    e.preventDefault()
    let deleteFormConfirm = document.querySelector('.form-change__wrapper')
    deleteClients(changeDeleteClient.dataset.clientId)
    const row = document.getElementById(changeDeleteClient.dataset.clientId)
    row.parentElement.removeChild(row)
    clearContactsChange()
    deleteFormConfirm.classList.remove('form-change__wrapper--active')
    modalBackground.classList.remove('modal-wrapper--active')
    errorContactsChange.classList.remove('form-change__error-contact--active')
    errorfieldsChange.classList.remove('form-change__error--active')
})

// Добавление значений в дерево и удаление через функцию confirmDelete + изменение
let list = await getData()

// сортировка 
async function getSortClients(prop, dir) {
    let clientsCopy = await getData()
    return clientsCopy.sort(function (clientA, clientB) {
        if ((!dir == false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop]))
            return -1;
    })
}

const filterNames = ['id', 'surname', 'createdAt', 'updatedAt']
const $clientsFilterButtons = document.querySelectorAll('.clients__table-tr button')
for (let button = 0; button < $clientsFilterButtons.length; button++) {
    let columnDirection = false
    $clientsFilterButtons[button].addEventListener('click', async function () {
        if (columnDirection == true) {
            $clientsFilterButtons[button].childNodes[1].style = 'transform:rotate(0);' // childNodes[1] - Это индекс svg иконки внутри
        }
        else {
            $clientsFilterButtons[button].childNodes[1].style = 'transform:rotate(180deg);'
        }
        let sortedList = await getSortClients(filterNames[button], columnDirection)
        createList(sortedList)
        columnDirection = !columnDirection
    })
}
// сортировка конец тут

// создание дом дерева клиентов
function createList(data) {
    clearTable()
    for (let item of data) {
        let clientCreate = createClientDom(item)
        // Удаление клиента
        confirmDelete(clientCreate, item)
    }

    const changes = changeVariables()
    const changeButtons = document.querySelectorAll('.clients__btn-change')
    for (let button = 0; button < changeButtons.length; button++) {
        changeButtons[button].addEventListener('click', async function () {
            const openUser = await getDataById(changeButtons[button].dataset.clientId)
            changes.changeFromConfirm.classList.toggle('form-change__wrapper--active')
            modalBackground.classList.add('modal-wrapper--active')
            changeDeleteClient.dataset.clientId = openUser.id // объявлена выше
            changes.changeFormId.textContent = openUser.id
            changes.changeLastname.value = openUser.surname
            changes.changeName.value = openUser.name
            changes.changeSecondname.value = openUser.lastName
            const contactWrapper = '.form-change__wrapper-contact'
            const contactButton = '.form-change__add-contact'
            const addContactButton = document.querySelector('.form-change__add-contact')
            if (openUser.contacts.length > 9) {
                addContactButton.style = 'display: none;'
            }
            for (let contact of openUser.contacts) {
                let contactCreate = createContact(contactWrapper, contactButton, contact.type)
                contactCreate.$clientContactInputValue.value = contact.value
            }
        })
    }
}
createList(list)

//Добавление Клиента в базу из формы создания клиента
async function putData() {
    const modalDom = modalNewClient()
    const contactWrapper = '.form-client__wrapper'
    const contactButton = '.form__add-contact'
    //Открытие формы добавления нового клиента
    modalDom.$addClient.addEventListener('click', function () {
        modalBackground.classList.add('modal-wrapper--active')
        modalDom.$clientAddForm.classList.toggle('form__wrapper--active');
        modalDom.$clientAddName.value = ''
        modalDom.$clientAddLastName.value = ''
        modalDom.$clientAddSecondName.value = ''
    })
    modalDom.$clientAddName.value = ''
    modalDom.$clientAddLastName.value = ''
    modalDom.$clientAddSecondName.value = ''

    const contactItems = document.getElementsByClassName('form-client__container')
    modalDom.$addContactButton.addEventListener('click', function (e) {
        e.preventDefault()
        if (contactItems.length < 9) {
            const contactItem = createContact(contactWrapper, contactButton)
        }
        else {
            const contactItem = createContact(contactWrapper, contactButton)
            modalDom.$addContactButton.style = 'display: none;'
        }
    })

    //Закрытие формы нового клиента и очистка контактов
    modalDom.$clientAddFromClose.addEventListener('click', function (e) {
        e.preventDefault()
        modalBackground.classList.remove('modal-wrapper--active')
        modalDom.$clientAddForm.classList.remove('form__wrapper--active')
        modalDom.$addContactButton.style = 'display: block;'
        errorfields.classList.remove('form-client__error--active')
        errorContacts.classList.remove('form-client__error-contact--active')
        clearContacts()
    })

    modalDom.$clientAddFormCancel.addEventListener('click', function (e) {
        e.preventDefault()
        modalBackground.classList.remove('modal-wrapper--active')
        modalDom.$clientAddForm.classList.remove('form__wrapper--active')
        modalDom.$addContactButton.style = 'display: block;'
        errorfields.classList.remove('form-client__error--active')
        errorContacts.classList.remove('form-client__error-contact--active')
        clearContacts()
    })


    let errorContacts = document.querySelector('.form-client__error-contact') //теги ошибок в добавлении
    let errorfields = document.querySelector('.form-client__error') //теги ошибок в добавлении
    // Сбор контактов
    modalDom.$saveClient.addEventListener('click', async function (e) {
        e.preventDefault()
        const selectContacts = document.querySelectorAll('.form-client__contact') //получение значения с селекта 
        const inputContacts = document.querySelectorAll('.form-client__phone')
        const contactsArray = []// ОБЯЗАТЕЛЬНО TYPE И VALUE     
        for (let x = 0; x < selectContacts.length; x++) {
            if (inputContacts[x].value == '') {
                errorContacts.classList.add('form-client__error-contact--active')
                return
            }
            else {
                contactsArray.push({
                    type: selectContacts[x].value,
                    value: inputContacts[x].value
                })
                errorContacts.classList.remove('form-client__error-contact--active')
            }
        }
        if (modalDom.$clientAddName.value == '' || modalDom.$clientAddLastName.value == '') {
            errorfields.classList.add('form-client__error--active')
        }
        else {
            errorfields.classList.remove('form-client__error--active')
            await addNewClient(modalDom.$clientAddName, modalDom.$clientAddLastName, modalDom.$clientAddSecondName, contactsArray)
            clearTable()
            clearContacts() //очистка контактов
            let list = await getData()
            createList(list)
            modalDom.$addContactButton.style = 'display: block;'
            modalDom.$clientAddForm.classList.remove('form__wrapper--active')
            modalBackground.classList.remove('modal-wrapper--active')
        }

    })
}
// кнопки изменения клиента
let errorContactsChange = document.querySelector('.form-change__error-contact') // теги ошибок в изменении
let errorfieldsChange = document.querySelector('.form-change__error')  // теги ошибок в изменении
const changeButtonContact = document.querySelector('.form-change__add-contact')
const changes = changeVariables()
changes.changeFormClose.addEventListener('click', function () {
    changes.changeFromConfirm.classList.remove('form-change__wrapper--active')
    changeButtonContact.style = 'display: block;'
    modalBackground.classList.remove('modal-wrapper--active')
    errorContactsChange.classList.remove('form-change__error-contact--active')
    errorfieldsChange.classList.remove('form-change__error--active')
    clearContactsChange()
})
changes.changeFormSave.addEventListener('click', async function (e) {
    e.preventDefault()
    const selectContacts = document.querySelectorAll('.form-client__contact') //получение значения с селекта 
    const inputContacts = document.querySelectorAll('.form-client__phone')
    const contactsArray = []// ОБЯЗАТЕЛЬНО TYPE И VALUE     
    for (let x = 0; x < selectContacts.length; x++) {
        if (inputContacts[x].value == '') {
            errorContactsChange.classList.add('form-change__error-contact--active')
            return
        }
        else {
            errorContactsChange.classList.remove('form-change__error-contact--active')
            contactsArray.push({
                type: selectContacts[x].value,
                value: inputContacts[x].value
            })
        }
    }
    if (changes.changeName.value == '' || changes.changeLastname.value == '') {
        errorfieldsChange.classList.add('form-change__error--active')
        return
    }
    else {
        errorfieldsChange.classList.remove('form-change__error--active')
        changes.changeFromConfirm.classList.remove('form-change__wrapper--active')
        modalBackground.classList.remove('modal-wrapper--active')
        changeButtonContact.style = 'display: block;'
        await changeClient(changes.changeFormId.textContent, changes.changeName, changes.changeLastname, changes.changeSecondname, contactsArray)
        clearContactsChange()
        let list = await getData()
        createList(list)
    }
})

// поиск по сайту
const headerForm = document.querySelector('.header__search')
const headerUl = document.createElement('ul')
headerUl.classList.add('header__list', 'header-list', 'list-reset')
headerForm.append(headerUl)
function seachClient(value, data) {
    let fio = data.map(el => `${el.surname} ${el.name} ${el.lastName}`)
    console.log(fio)
    document.querySelectorAll(`.header-list__item`).forEach(el => el.remove())
    for (let i = 0; i < data.length; i++) {
        const seach = fio[i].indexOf(value)
        if (seach !== -1) {
            const headerLi = document.createElement(`li`)
            const headerRef = document.createElement(`a`)
            headerRef.classList.add('header-list__link')
            headerLi.classList.add(`header-list__item`)
            headerRef.textContent = fio[i]
            headerUl.append(headerLi)
            headerLi.append(headerRef)
            headerRef.href = "#" + data[i].id
            headerRef.addEventListener('click', function () {
                let clientTr = document.getElementById(data[i].id)
                clientTr.style.background = '#7B61FF'
                setTimeout(() => {
                    clientTr.style.background = 'transparent'
                }, 2500)
            })
        }
    }
    if (value.length == 0) {
        document.querySelectorAll(`.header-list__item`).forEach(el => el.remove())
    };
}

let timeOut
const inputSearch = document.querySelector('.header__input')
inputSearch.addEventListener('input', async function (e) {
    if (e.keyCode == 13) {
        e.preventDefault()
    }
    clearTimeout(timeOut)
    timeOut = setTimeout(async function () {
        let data = await getData()
        seachClient(inputSearch.value, data)
    }, 300)
})
// Поиск концовка

putData()





