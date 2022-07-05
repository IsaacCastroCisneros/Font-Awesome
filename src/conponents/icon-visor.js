import addGlobalEventListener from "../util/addGlobalListener";

let classesObj = 
{
    icon:'fa-rocket',
    size:undefined,
    animate:undefined,
    color:undefined
} 

export default function iconVisor()
{
     createIcon();
 
     addGlobalEventListener('click','[data-styling-button]',e=>
     {
        const button = e.target.closest('[data-styling-button]');
        const buttonId = button.dataset.id;
        
        const optionsActive = document.querySelector('[data-styling-options].show');
        if(optionsActive!==null)
        {
            const buttonActive = document.querySelector('[data-styling-button].show')
            optionsActive.classList.remove('show');
            buttonActive.classList.remove('show');
        }
        
        const options = document.querySelector(`[data-styling-options][data-id=${buttonId}]`);
        options.classList.add('show')
        button.classList.add('show');
     })
     addGlobalEventListener('click','[data-styling-item]',e=>
     {
        const options = e.target.closest('[data-styling-options]')
        const type = options.dataset.id;
        const item = e.target.closest('[data-styling-item]');
        const inputChecked = item.querySelector('input').checked=true;
        const str = item.dataset.id;
        
        const container = document.querySelector('[data-styling-icon-container]');
        
        switch(type)
        {
            case 'icon': 
            {
                classesObj.icon='fa-'+str;
            }
            break;
            case 'size': 
            {
                classesObj.size='fa-'+str;
            }
            break;
            case 'animate':
            {
                classesObj.animate='fa-'+str;
            }
            break;
            case 'color':
            {
                classesObj.color=str;
            }
        }
        if(inputChecked)
        {
            container.innerHTML='';
            createIcon()
        }
        
     })
}

function createIcon()
{
    const classesArr = Object.values(classesObj).
    filter(entry=>
    {
       return entry!==undefined && entry!=='fa-none'
    }
    );
     
    const icon =  renderIcon(classesArr);
    const container = document.querySelector('[data-styling-icon-container]');
    container.appendChild(icon.icon);
    
    const iconHtml = document.querySelector('[data-styling-html]');
    iconHtml.textContent=icon.html;
}

function renderIcon(classesArr)
{
    const template = document.querySelector('[data-icon-template]');
    const iconClone = template.content.cloneNode(true);
    const icon = iconClone.querySelector('i');
    
    classesArr.forEach(classList => 
    {
        if(classList==='none')
        {
            icon.style.removeProperty('color');
        }
        else if(classList.includes('#')===false)
        {
           icon.classList.add(classList)
        }
        else
        {
            icon.style.color=classList
        }
    });
    
    return {icon:iconClone, html:icon.outerHTML} 
}