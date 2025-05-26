class FormVerification {
    constructor() {
        this.form = document.querySelector("form");
        this.firstName = document.getElementsByName("fn");
        this.lastName = document.getElementsByName("ln");
        this.email = document.getElementsByName("ea");
        this.queryType = document.getElementsByName("qt");
        this.queryTypeContainer = document.querySelector(".radiogroup");
        this.message = document.getElementsByName("msg");
        this.terms = document.getElementsByName("at");
        this.termsContainer = document.querySelector(".terms-input");
        this.checker();
    }

    displayError(place, text) {
        const span = document.createElement("span");
        switch (place) {
            case this.queryTypeContainer : span.id = `qt-error`; break;
            case this.termsContainer : span.id = `at-error`; break;
            default : span.id = `${place.name}-error`;
        }
        span.setAttribute("role", "alert");
        span.classList.add("error");
        span.textContent = `${text}`;
        place.style.borderColor = "hsl(0, 66%, 54%)";
        if(place.nextElementSibling?.classList.contains("error")) {
            span.remove();
        }
        else {
            place.after(span);
        }
    }

    init(place, field) {
        field.setAttribute("aria-invalid", "false");
        field.removeAttribute("aria-decribedby");
        place.style.borderColor = "hsl(187, 24%, 22%)";
        const parent = place.parentElement;
        const allChilds = Array.from(parent.children);
        allChilds.forEach(ch => {
            if(ch.classList.contains("error")) ch.remove();
        });
    }

    checker() {
        document.addEventListener("DOMContentLoaded", _ => {
            this.form.addEventListener("submit", (e) => {
                e.preventDefault();
                if(!this.firstName[0].value) {
                    this.displayError(this.firstName[0], "This field is required");
                    this.firstName[0].setAttribute("aria-invalid", "true");
                    this.firstName[0].setAttribute("aria-decribedby", "fn-error");
                }
                else this.init(this.firstName[0], this.firstName[0]);
                if(!this.lastName[0].value) {
                    this.displayError(this.lastName[0], "This field is required");
                    this.lastName[0].setAttribute("aria-invalid", "true");
                    this.lastName[0].setAttribute("aria-decribedby", "ln-error");
                }
                else this.init(this.lastName[0], this.lastName[0]);
                if(!this.email[0].value) {
                    this.displayError(this.email[0], "Please enter a valid email address");
                    this.email[0].setAttribute("aria-invalid", "true");
                    this.email[0].setAttribute("aria-decribedby", "ea-error");
                }
                else this.init(this.email[0], this.email[0]);
                if(!this.queryType[0].checked && !this.queryType[1].checked) {
                    this.displayError(this.queryTypeContainer, "Please select a query type");
                    this.queryType[0].setAttribute("aria-invalid", "true");
                    this.queryType[0].setAttribute("aria-decribedby", "qt-error");
                }
                else this.init(this.queryTypeContainer, this.queryType[0]);
                if(!this.message[0].value) {
                    this.displayError(this.message[0], "This field is required");
                    this.message[0].setAttribute("aria-invalid", "true");
                    this.message[0].setAttribute("aria-decribedby", "msg-error");
                }
                else this.init(this.message[0], this.message[0]);
                if(!this.terms[0].checked) {
                    this.displayError(this.termsContainer, "To submit this form, please consent to being contacted");
                    this.terms[0].setAttribute("aria-invalid", "true");
                    this.terms[0].setAttribute("aria-decribedby", "at-error");
                }
                else this.init(this.termsContainer, this.terms[0])

                if(this.firstName[0].value && this.lastName[0].value && this.email[0].value && (this.queryType[0].checked || this.queryType[1].checked)
                && this.message[0].value && this.terms[0].checked) {
                    document.querySelector(".notification").style.display = "block";
                    setTimeout(() => {
                        e.target.submit();
                    }, 3000);
                }
            else return;
            })
        })
    }
}

// main
input = new FormVerification();