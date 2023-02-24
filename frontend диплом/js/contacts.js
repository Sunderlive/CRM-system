export function createContact(wrapper, button, contact) {

    const $clientAddButton = document.querySelector(button)     // .form-change__add-contact .form__add-contact
    const $formWrapper = document.querySelector(wrapper)      // .form-change__wrapper-contact  .form-client__wrapper
    const $formContainer = document.createElement('div')
    const $clientContactSelect = document.createElement('select')
    const $clientContactOptionPhone = document.createElement('option')
    const $clientContactOptionSecondPhone = document.createElement('option')
    const $clientContactOptionEmail = document.createElement('option')
    const $clientContactOptionVk = document.createElement('option')
    const $clientContactOptionFacebook = document.createElement('option')
    const $clientContactInputValue = document.createElement('input')
    const $clientContactButtonRemove = document.createElement('button')
    const $clientContactAddContact = document.createElement('button')
    const buttonSvgDelete = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_121_1083)">
    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
    </g>
    <defs>
    <clipPath id="clip0_121_1083">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>` 

    $formContainer.classList.add('form-client__container')
    $clientContactSelect.classList.add('choices', 'form-client__contact')
    $clientContactOptionPhone.classList.add('form-client__contact-item')
    $clientContactOptionSecondPhone.classList.add('form-client__contact-item')
    $clientContactOptionEmail.classList.add('form-client__contact-item')
    $clientContactOptionVk.classList.add('form-client__contact-item')
    $clientContactOptionFacebook.classList.add('form-client__contact-item')
    $clientContactInputValue.classList.add('form-client__phone')
    $clientContactButtonRemove.classList.add('form-client__contact-remove')
    $clientContactAddContact.classList.add('form__add-contact', 'btn-reset')

    $clientContactSelect.name = 'contact'
    $clientContactOptionPhone.textContent = 'Телефон'
    $clientContactOptionSecondPhone.textContent = 'Доп. телефон'
    $clientContactOptionEmail.textContent = 'Email'
    $clientContactOptionVk.textContent = 'Vk'
    $clientContactOptionFacebook.textContent = 'Facebook'
    $clientContactInputValue.placeholder = 'Введите данные контакта'
    $clientContactInputValue.type= 'text'
    $clientContactButtonRemove.innerHTML = buttonSvgDelete 

    $clientContactOptionPhone.value = 'Телефон'
    $clientContactOptionSecondPhone.value = 'Доп. телефон'
    $clientContactOptionEmail.value = 'Email'
    $clientContactOptionVk.value = 'Vk'
    $clientContactOptionFacebook.value = 'Facebook'

    tippy($clientContactButtonRemove,{
        content: `Удалить контакт` ,
        placement: 'top',
    })

    $clientContactButtonRemove.addEventListener('click', function(e){
        e.preventDefault()
        $formContainer.remove()
        document.querySelector('.form__add-contact').style = 'display:block;'
        document.querySelector('.form-change__add-contact').style = 'display:block;'
    })

    $formWrapper.append($formContainer)
    $formContainer.append($clientContactSelect)
    $clientContactSelect.append($clientContactOptionPhone)
    $clientContactSelect.append($clientContactOptionSecondPhone)
    $clientContactSelect.append($clientContactOptionEmail)
    $clientContactSelect.append($clientContactOptionVk)
    $clientContactSelect.append($clientContactOptionFacebook)
    $formContainer.append($clientContactInputValue)
    $formContainer.append($clientContactButtonRemove)
    $clientContactButtonRemove.innerHTML = buttonSvgDelete
    let parentButton = $clientAddButton.parentNode
    parentButton.insertBefore($formContainer, $clientAddButton) // меняем местами кнопку и дом

    if (contact === null){
        return
    }
    else {
        for (let i = 0; i < $clientContactSelect.length; i++) {
        if ($clientContactSelect[i].textContent === contact) $clientContactSelect[i].selected = true;  
        }
    }
    
    const choices = new Choices($clientContactSelect, {
              position: 'bottom',
              searchEnabled: false,
              shouldSort: false,
              itemSelectText: '',
    })
    
    return {
        $formContainer,
        $clientContactSelect,
        $clientContactInputValue,
        $clientContactOptionPhone,
        $clientContactOptionSecondPhone,
        $clientContactOptionEmail,
        $clientContactOptionVk,
        $clientContactOptionFacebook
    }
}