import './style.css'


type Email = {
  from: string;
  header: string;
  content: string;
  emailAddress: string;
  img: string;
  read: boolean;
}


type State = {
  emails: Email[];
}


const state = {
  emails: [
    {
      from: 'Nico',
      header: "Link to today's video and slides is up!",
      content:
        'Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'nico@email.com',
      img: 'assets/nico.JPG',
      read: false
    },
    {
      from: 'Ed',
      header:
        "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
      content:
        'Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'ed@email.com',
      img: 'assets/ed.JPG',
      read: false
    },
    {
      from: 'Government',
      header: 'Time to pay your tax!',
      content:
        'Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: false
    }
    // feel free to add more emails here
  ]
}


function createSingleEmail(email: Email){
//   <section class="single-email">
//   <button class="single-email__button">⬅Back</button>
//   <div class="single-email__sender-section">
//     <img class="single-email__image" src="assets/nico.JPG" />
//     <span class="single-email__sender">Nico (nico@email.com)</span>
//   </div>
//   <h1 class="single-email__header">Link to today's video and slides is up!</h1>
//   <p class="single-email__content">
//     Link is up and you know where to find it! Lorem ipsum dolor sit amet
//     consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis
//     incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a
//     architecto earum voluptatibus vel atque.
//   </p>
// </section>


let mainEl = document.querySelector('main')
mainEl.textContent = ''

let sectionEl1 = document.createElement('section')
sectionEl1.className= 'single-email'

let buttonEl = document.createElement('button')
buttonEl.className = 'single-email__button'
buttonEl.innerText = '⬅Back'

let divEl = document.createElement('div')
divEl.className = 'single-email__sender-section'

let imgEl = document.createElement('img')
imgEl.className = 'single-email__image'
imgEl.src = email.img

let spanEl = document.createElement('span')
spanEl.className = 'single-email__sender'
spanEl.textContent = `${email.from} (${email.emailAddress})`

divEl.append(imgEl, spanEl)

let h1El = document.createElement('h1')
h1El.className = 'single-email__header'
h1El.textContent = email.header

let pEl = document.createElement('p')
pEl.className = 'single-email__content'
pEl.textContent = email.content

sectionEl1.append(buttonEl, divEl, h1El, pEl)
mainEl?.append(sectionEl1)


}

function createEmailList(email: Email){
  let mainEl = document.querySelector('main')
  mainEl.textContent = ''

  let ulEl = document.createElement('ul')
  ulEl.className = 'email-list'

  let h1El = document.createElement('h1')
  h1El.textContent = 'Inbox'


  if(email.read === true){
    let liEl = document.createElement('li')
    liEl.className = 'email-list__item read'

    let spanEl = document.createElement('span')
    spanEl.className = 'emails-list__item__read-icon material-symbols-outlined'
    spanEl.textContent = 'mark_email_read'

    let imgEl = document.createElement('img')
    imgEl.className = 'email-list__item__image'
    imgEl.src = email.img

    let pEl1 = document.createElement('p')
    pEl1.className = 'email-list__item__from'
    pEl1.textContent = email.from

    let pEl2 = document.createElement('p')
    pEl2.className = 'email-list__item__content'
    pEl2.textContent = email.content

    liEl.append(spanEl, imgEl, pEl1, pEl2)
    ulEl.append(liEl)
  }
  else{
    let liEl = document.createElement('li')
    liEl.className = 'email-list__item'

    let spanEl = document.createElement('span')
    spanEl.className = 'emails-list__item__read-icon material-symbols-outlined'
    spanEl.textContent = 'mark_email_unread'

    let imgEl = document.createElement('img')
    imgEl.className = 'email-list__item__image'
    imgEl.src = email.img

    let pEl1 = document.createElement('p')
    pEl1.className = 'email-list__item__from'
    pEl1.textContent = email.from

    let pEl2 = document.createElement('p')
    pEl2.className = 'email-list__item__content'
    pEl2.textContent = email.content

    liEl.append(spanEl, imgEl, pEl1, pEl2)
    ulEl.append(liEl)
  }
  mainEl?.append(h1El, ulEl)
}


function render(){
  createSingleEmail(state.emails[0])
  createEmailList(state.emails[0])
}

render()
