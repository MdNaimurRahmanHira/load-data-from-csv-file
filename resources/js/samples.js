// The select tag in html
let select = document.querySelector('#language-select');
//when select value changes
select.onchange = function () {
    // child divs of all file wrapper
    let childOfallFileWrapper = document.querySelector('.all-file-wrapper').children;

    //converting childOfallFileWrapper to array
    let allFileToArray = Array.from(childOfallFileWrapper);

    // the index number that are selected
    let slctdIndex = select.selectedIndex;

    //Hiding all element of allFileToArray
    allFileToArray.map(e => {
        e.style.display = 'none';
    });

    // showing the file that has same index number of selected option
    if (childOfallFileWrapper[slctdIndex].style.display === 'none') {
        childOfallFileWrapper[slctdIndex].style.display = 'block';
    };

} //closing of onchange function


// form validation check
let sendtBtn = document.querySelector('.send-btn');
sendtBtn.addEventListener('click', function () {
    let nameInput = document.querySelector('.name input');
    let companyInput = document.querySelector('.company input');
    let messageInput = document.querySelector('.message textarea');

    if (nameInput.value.length < 3) { //if name inputs value is less then 3 character
        // then show the error text
        nameInput.nextElementSibling.style.display = 'block'

    } else if (nameInput.value.length > 3) { //if name inputs value is greater then 3 character
        nameInput.nextElementSibling.style.display = 'none' // then hide the error text
    }
    if (companyInput.value.length < 3) { //if company inputs value is less then 3 character
        companyInput.nextElementSibling.style.display = 'block' // then show the error text

    } else if (companyInput.value.length > 3) { //if Company inputs value is greater then 3 character
        companyInput.nextElementSibling.style.display = 'none' // then hide the error text
    }
    if (messageInput.value.length < 10) { //if message inputs value is less then 3 character
        messageInput.nextElementSibling.style.display = 'block' // then show the error text

    } else if (messageInput.value.length > 10) { //if Company inputs value is greater then 3 character
        messageInput.nextElementSibling.style.display = 'none' // then hide the error text
    }

})


// reading the python csv file and iserting data from the csv to html.
fetch("./python.csv").then(res => {
    return res.text()
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(",")
    });
    console.log(result);
    let showTenOnly = result.slice(0, 10)
    showTenOnly.map((item) => {
        let htmls = `<div class="accordion-file">
                        <button class="accordion-btn ">${item[0]}<img src="${item[2].includes('True')?'resources/images/locked.png':'resources/images/unlocked.png'}"
                            alt=""></button>
                        <div class="accordion-content">
                            <p>${item[4]}</p>
                            <div class="btn-wrapper">
                                <button class="btn btn-primary me-4 ${item[2].includes('True')?'disabled':''}">View</button>
                                <button class="btn btn-success ${item[2].includes('True')?'disabled':''}">Download</button>
                            </div>
                        </div>
                     </div>`;
        let rNav = document.querySelector('.python-files nav');
        rNav.insertAdjacentHTML('beforebegin', htmls);
    });

});



// reading the r csv file and iserting data from the csv to html.
fetch("./r.csv").then(res => {
    return res.text()
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(",")
    });
    console.log(result);
    let showTenOnly = result.slice(0, 10)
    showTenOnly.map((item) => {
        let htmls = `<div class="accordion-file">
                        <button class="accordion-btn ">${item[0]}<img src="${item[2].includes('True')?'resources/images/locked.png':'resources/images/unlocked.png'}"
                            alt=""></button>
                        <div class="accordion-content">
                            <p>${item[4]}</p>
                            <div class="btn-wrapper">
                                <button class="btn btn-primary me-4 ${item[2].includes('True')?'disabled':''}">View</button>
                                <button class="btn btn-success ${item[2].includes('True')?'disabled':''}">Download</button>
                            </div>
                        </div>
                     </div>`;
        let rNav = document.querySelector('.r-files nav');
        rNav.insertAdjacentHTML('beforebegin', htmls);
    });

});


// reading the jupyter csv file and iserting data from the csv to html.
fetch("./jupyter.csv").then(res => {
    return res.text()
}).then(data => {
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(",")
    });
    console.log(result);
    let showTenOnly = result.slice(0, 10)
    showTenOnly.map((item) => {
        let htmls = `<div class="accordion-file">
                        <button class="accordion-btn ">${item[0]}<img src="${item[2].includes('True')?'resources/images/locked.png':'resources/images/unlocked.png'}"
                            alt=""></button>
                        <div class="accordion-content">
                            <p>${item[4]}</p>
                            <div class="btn-wrapper">
                                <button class="btn btn-primary me-4 ${item[2].includes('True')?'disabled':''}">View</button>
                                <button class="btn btn-success ${item[2].includes('True')?'disabled':''}">Download</button>
                            </div>
                        </div>
                     </div>`;
        let rNav = document.querySelector('.jupyter-files nav');
        rNav.insertAdjacentHTML('beforebegin', htmls);
    });

});





window.addEventListener("load", function () {
    ///this is the accordion button  
    let accbtn = document.getElementsByClassName("accordion-btn");
    for (let i = 0; i < accbtn.length; i++) {
        //when one of the buttons are clicked run this function
        accbtn[i].onclick = function () {
            //letiables
            let panel = this.nextElementSibling;
            let accContent = document.getElementsByClassName("accordion-content");
            let courseAccordion = document.getElementsByClassName("accordion-btn");
            let accActive = document.getElementsByClassName("accordion-btn active");
            /*if pannel is already open - minimize*/
            if (panel.style.maxHeight) {
                //minifies current pannel if already open
                panel.style.maxHeight = null;
                //removes the 'active' class as toggle didnt work on browsers minus chrome
                this.classList.remove("active");
            } else { //pannel isnt open...
                //goes through the buttons and removes the 'active' css (+ and -)
                for (let ii = 0; ii < accActive.length; ii++) {
                    accActive[ii].classList.remove("active");
                }
                //Goes through and removes 'activ' from the css, also minifies any 'panels' that might be open
                for (let iii = 0; iii < accContent.length; iii++) {
                    this.classList.remove("active");
                    accContent[iii].style.maxHeight = null;
                }
                //opens the specified pannel
                panel.style.maxHeight = panel.scrollHeight + "px";
                //adds the 'active' addition to the css.
                this.classList.add("active");
            }
        } //closing to the acc onclick function
    } //closing to the for loop.
});