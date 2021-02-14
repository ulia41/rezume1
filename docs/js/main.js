$(document).ready(function () {

const burger = document.querySelector(".header-burger");//выбор бургера//
const menu = document.querySelector(".mobile-menu");//выбор мобильного меню//
const overlay = document.querySelector("#overlay");//выбор overlay//
const sk = document.body;//выбор noskroll//


burger.addEventListener("click", function(){
    this.classList.toggle("activ");
    menu.classList.toggle("activ");
    overlay.classList.toggle("activ");
    sk.classList.toggle("noskroll");
});

menu.addEventListener("click", function(){
    this.classList.remove("activ");
    burger.classList.remove("activ");
    overlay.classList.remove("activ");
    sk.classList.remove("noskroll");
})

//Фильтрация проекта с карточками в портфолио//

let containerEl = document.querySelector('#portfolio-works');

    let mixer = mixitup(containerEl, {
        classNames: {
            block: ""
		}
	
    });


//placeholder//
const formItems = document.querySelectorAll('.form-field');
	
	for(let item of formItems){
		const thisParent = item.closest('.form-item');
		const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
		// Если инпут в фокусе		
		item.addEventListener('focus', function(){
			thisPlaceholder.classList.add('active');
		});

		// Если инпут теряет фокус
		item.addEventListener('blur', function(){

			if(item.value.length > 0){
				thisPlaceholder.classList.add('active');
			}
			else{
				thisPlaceholder.classList.remove('active');
			}
		})
	}

	//FORM VALIDATE
	$('.contact-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	})

	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

	

// ПАРАЛЛАКС ДВИЖЕНИЯ ЗА МЫШКОЙ

let prxItem = document.querySelectorAll('.contact-icon');
let prxScene = document.querySelector('.contacts')

prxScene.addEventListener('mousemove', function (e) {

	let x = e.clientX / window.innerWidth;

	let y = e.clientY / window.innerHeight;

	for (let item of prxItem) {

		item.style.transform = 'translate(-' + x * 80 + 'px, -' + y * 80 + 'px)';
	
	}

});

})