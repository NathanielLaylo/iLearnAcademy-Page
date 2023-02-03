var webstore = new Vue({

    el: '#app',
    data: { // the 'data' option
        sitename: 'iLearn Academy',
        showLesson: true,
        lesson: [],
        placedOrder: [],
        cart: [],
        search: [],
        sortOrder: 0,
        enableCheckoutButton: false,
        searchInput: ""
    },
    //add for handling error 
    created: function(){
        fetch("https://ilearnacademy-env.eba-gpcfp2zw.eu-west-2.elasticbeanstalk.com/collections/lessons").then(
            function(res){
                res.json().then(
                    function(json){
                        //alert(json);
                        console.log(json);
                        webstore.lesson = json;
                    }
                )
            }
        ),
        fetch("https://ilearnacademy-env.eba-gpcfp2zw.eu-west-2.elasticbeanstalk.com/collections/order").then(
            function(res){
                res.json().then(
                    function(json){
                        //alert(json);
                        console.log(json);
                        webstore.placedOrder = json;
                    }
                )
            }
        )
    },
    methods: {
        add: function (selectedLesson) {
            let x = parseFloat(selectedLesson.space);
            let cartLess = structuredClone(selectedLesson);
            if (x > 0) {
                x = x - 1;
                cartLess.space = 1;
                this.cart.push(cartLess);
                selectedLesson.space = x;
            }
        },
        remove: function (selectedLesson) {
            const index = this.cart.indexOf(selectedLesson);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
            var lessonLength = this.lesson.length;
            for (var i = 0; i < lessonLength; i++) {
                if (this.lesson[i].id == selectedLesson.id) {
                    this.lesson[i].space++;
                }

            }

        },
        toggleShowCart() {
            this.showLesson = this.showLesson ? false : true;
        },
        canAddtoCart(selectedLesson) {
            return selectedLesson.space > 0;
        },
        sorter() {
            let a = (document.getElementById("SortOrder").value);
            let b = (document.getElementById("SortType").value);
            this.sortOrder = a * b;
            this.sortLesson();

        },
        sortLesson() {
            switch (this.sortOrder) {
                case 5:
                    function subAsc(a, b) {
                        if (a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
                        if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
                        return 0;
                    }
                    this.lesson.sort(subAsc);
                    this.cart.sort(subAsc);
                    break;

                case 6:
                    function subDes(a, b) {
                        if (a.subject.toLowerCase() > b.subject.toLowerCase()) return -1;
                        if (a.subject.toLowerCase() < b.subject.toLowerCase()) return 1;
                        return 0;
                    }
                    this.lesson.sort(subDes);
                    this.cart.sort(subDes);
                    break;

                case 10:
                    function locAsc(a, b) {
                        if (a.location.toLowerCase() > b.location.toLowerCase()) return 1;
                        if (a.location.toLowerCase() < b.location.toLowerCase()) return -1;
                        return 0;
                    }
                    this.lesson.sort(locAsc);
                    this.cart.sort(locAsc);
                    break;

                case 12:
                    function locDes(a, b) {
                        if (a.location.toLowerCase() > b.location.toLowerCase()) return -1;
                        if (a.location.toLowerCase() < b.location.toLowerCase()) return 1;
                        return 0;
                    }
                    this.lesson.sort(locDes);
                    this.cart.sort(locDes);
                    break;

                case 15:
                    function priAsc(a, b) {
                        if (a.price > b.price) return 1;
                        if (a.price < b.price) return -1;
                        return 0;
                    }
                    this.lesson.sort(priAsc);
                    this.cart.sort(priAsc);
                    break;

                case 18:
                    function priDes(a, b) {
                        if (a.price > b.price) return -1;
                        if (a.price < b.price) return 1;
                        return 0;
                    }
                    this.lesson.sort(priDes);
                    this.cart.sort(priDes);
                    break;

                case 20:
                    function spaAsc(a, b) {
                        if (a.space > b.space) return 1;
                        if (a.space < b.space) return -1;
                        return 0;
                    }
                    this.lesson.sort(spaAsc);
                    this.cart.sort(spaAsc);
                    break;

                case 24:
                    function spaDes(a, b) {
                        if (a.space > b.space) return -1;
                        if (a.space < b.space) return 1;
                        return 0;
                    }
                    this.lesson.sort(spaDes);
                    this.cart.sort(spaDes);
                    break;
            }

        },
        checkName() {
            let userName = document.forms["checkoutForm"]["userName"].value;
            return /^[a-zA-Z]+$/.test(userName);
        },
        checkNumber() {
            let userNumber = document.forms["checkoutForm"]["userNumber"].value;
            return /^[1-9]+$/.test(userNumber);
        },
        enableCheckButton() {
            if ((this.checkNumber()) && (this.checkName())) {
                this.enableCheckoutButton = true;
            } else {
                this.enableCheckoutButton = false;
            }

        },
        // submitCheckout() {
        //     let userName = document.forms["checkoutForm"]["userName"].value;
        //     document.getElementById('checkFeedback').innerHTML = "Thank you, " + userName + "! Your order has been submitted.";
        //     alert("Thank you, " + userName + "! Your order has been submitted.");
        //     this.searchOnType();
        // },

        submitCheckout() {
            let userName = document.forms["checkoutForm"]["userName"].value;
            let userNumber = document.forms["checkoutForm"]["userNumber"].value;
            let order = {
                name: userName,
                phone_number: userNumber,
                lesson_ID: 1001,
                space: 1
            };
            let lesson = {
                space: 1
            };

            fetch("https://ilearnacademy-env.eba-gpcfp2zw.eu-west-2.elasticbeanstalk.com/collections/order", {
                method: "POST", //set the HTTP method as "POST"
                headers: {
                    "Content-Type": "application/json", //set the data type as JSON
                },              
                body: JSON.stringify(order) //need to stringigy the JSON
            }).then(
                function (response) {
                    response.json().then(
                        function (json) {
                            alert("Success: " + json.acknowledged);
                            console.log("Success: " + json.acknowledged);
                            webstore.placedOrder.push(newProduct);
                        }
                    )
                }
            );

            fetch("https://ilearnacademy-env.eba-gpcfp2zw.eu-west-2.elasticbeanstalk.com/collections/order", {
                method: "PUT", //set the HTTP method as "PUT"
                headers: {
                    "Content-Type": "application/json", //set the data type as JSON
                },              
                body: JSON.stringify(order) //need to stringigy the JSON
            }).then(
                function (response) {
                    response.json().then(
                        function (json) {
                            alert("Success: " + json.acknowledged);
                            console.log("Success: " + json.acknowledged);
                            webstore.lessons.updateOne({ id: 1001 },
                            { $set: lesson});
                        }
                    )
                }
            );
        },

        stringLength(str){
            let strLength = 0;
            while(str[strLength] !== undefined){
                strLength++;
            }
            return strLength;
        },
        searchOnType(){
            this.searchInput = document.getElementById('searchInput').value.toLowerCase();
            let inputLength = this.stringLength(this.searchInput);
            let subCounter = 0;
            let stopper = false;
            let locCounter = 0;
            this.search = [];
            let i = 0;
            this.lesson.forEach(element => { 
                i = 0;
                let subjectLength = this.stringLength(element.subject);
                stopper = false;                               
                while(( i + inputLength) <=  subjectLength){
                    for(let x = 0; x < inputLength; x++){
                        if(element.subject[i+x].toLowerCase() == this.searchInput[x]){                           
                            subCounter++; 
                        } else {
                            subCounter = 0;
                        }
                        if(subCounter == inputLength){
                            this.search.push(element);
                            stopper = true;
                            break;               
                        }                       
                    }           
                    subCounter = 0;
                    i++; 
                    if(stopper){                       
                        break;               
                    }                 
                }
                if(!stopper){
                    i = 0;
                    let locationLength = this.stringLength(element.location);
                    while(( i + inputLength) <=  locationLength){
                        for(let x = 0; x < inputLength; x++){
                            if(element.location[i+x].toLowerCase() == this.searchInput[x]){                           
                                locCounter++; 
                            } else {
                                locCounter = 0;
                            }
                            if(locCounter == inputLength){
                                this.search.push(element);
                                stopper = true;
                                break;               
                            }                       
                        }                                  
                        locCounter = 0;
                        i++; 
                        if(stopper){                       
                            break;               
                        }                
                    }
                }                               
            });
        }
        
    },
    computed: {
        totalItemsCart: function () {
            return this.cart.length || "";
        },
        enableCart() {
            if(this.cart.length == 0){
                this.showLesson = true;
            }
            return this.cart.length > 0;
        },
        showSearch() {
            return this.searchInput.length > 0;
        },
        showTotal: function(){
            let total = 0;
            this.cart.forEach(element => { 
                total+= element.price;
            });
            return total;
        }
    }
});

