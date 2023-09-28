let sideBarLinks=document.querySelectorAll('.tooltip')

let url=document.URL.split("/admin/")[1]

sideBarLinks.forEach(lnk=>{
    if(lnk.href.split('/admin')[1].split('/')[1] === url){
        lnk.classList.add("active")
    }
})