
function generetorRandomId() {

    return Math.floor(Math.random() * 9999999999)
}





const users = [
    {id: generetorRandomId(),name: "Evren",lastname: "Oğul"},
    {id: generetorRandomId(), name: "Barıs", lastname: "Yılmaz"},
    {id: generetorRandomId(), name: "Kerem", lastname: "Akturkoglu"}
]

console.log(users)

const tbody = document.getElementById('personel-table')

function createHTMLElement(etiketAdi,etiketDeger) {
    //html etiket tr th td 

    const html_etiketi = document.createElement(etiketAdi)


    if(etiketDeger) {

        if(etiketAdi === "input") {
            html_etiketi.value = etiketDeger
            html_etiketi.disabled = true;
        } else {
            html_etiketi.innerText = etiketDeger
        }
    }
    return html_etiketi
}

function handleInputChange(update_btn) {

    if(update_btn.innerText === "Update") {
        update_btn.innerText = "Accept"
        update_btn.className = "btn btn-success me-3"
    }
}

//yeni user ekle
function addNewUser() {

    const ad = prompt("Personel Adı giriniz")
    console.log(ad)

    if(ad === null) return;

    const soyad = prompt("Personel Soyadı giriniz")

    if (soyad === null) return;

    //users arrayine obje olarak gönder

    const model = {id: generetorRandomId(), name: ad, lastname: soyad}
    //arraye gönder
    users.push(model)
    console.log(users)

    updateDom()
}



//tüm verileri sil
function clearTable() {

    const onayla = confirm("Tüm veriler silinecek emin misin")

    if(onayla) {
        users.length = 0
        console.log(users)
        updateDom()
    }
}



function updateDom() {

    //tbody'i boşalt
    tbody.innerText = "";

     //high order function
     users.forEach(function(user,index) {

        const tr = createHTMLElement('tr')
        const th = createHTMLElement('th',user.id)
        const ad = createHTMLElement('td')
        const adInput = createHTMLElement('input',user.name)
        ad.append(adInput)
        const soyad = createHTMLElement('td')
        const soyadInput = createHTMLElement('input',user.lastname)
        soyad.append(soyadInput)

        const mod_arac_gerec = createHTMLElement('td')
        const updateBtn = createHTMLElement('button','Update')

        //update'e tıklandığında
        updateBtn.onclick = function() {

            if(adInput.disabled === false && soyadInput.disabled === false) {

                adInput.disabled = true;
                soyadInput.disabled = true;
        
                //buton şeklini değiştir
                updateBtn.className = "btn btn-warning me-3"
                user.name = adInput.value
                user.lastname = soyadInput.value
                alert("basarılı sekilde guncellendi")
                updateBtn.innerText = "Update"
                } else {
                    adInput.disabled = false; 
                    adInput.focus()
        
                    soyadInput.disabled = false;
                }
        
                    
            }
                
        adInput.oninput = function() {
            handleInputChange(updateBtn)
        }

        soyadInput.oninput = function() {
            handleInputChange(updateBtn)
        }

        const deleteBtn = createHTMLElement('button','Delete')

        //deleteBtn'e işlev ver
        deleteBtn.onclick = function() {
            alert(user.id)

            const onay = confirm(`${user.name} silinecek bu işlem geri alınamaz`)

            if(onay === true) {
                //arrayden sil
                const kullanici = users.splice(index,1)
                console.log("silinen user: ",kullanici)
                console.log("orijinal veri: ",users)

                //updateDomu çağır
                updateDom()
            }
        }


        //updateBtn ve deleteBtn e css ver
        updateBtn.className = "btn btn-warning me-3"
        deleteBtn.className = "btn btn-danger"


        tr.append(th)
        tr.append(ad)
        tr.append(soyad)

        mod_arac_gerec.append(updateBtn)
        mod_arac_gerec.append(deleteBtn)

        tr.append(mod_arac_gerec)
        tbody.append(tr)

    })
}

//sayfa tamamen yüklendiğinde
window.onload = function() {

    updateDom()

}

