import addGlobalEventListener from "../util/addGlobalListener";

export default function navBar()
{
    addGlobalEventListener('click','[data-nav-bar-menu-button]',e=>
    {
        const button = e.target.closest('[data-nav-bar-menu-button]');
        const menu = document.querySelector('[data-nav-bar-mob-menu]');
        button.classList.toggle('active');
        menu.classList.toggle('show');

    })
    
}