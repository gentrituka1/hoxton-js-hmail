import './style.css'

type Email = {
  from: string
  header: string
  content: string
  emailAddress: string
  img: string
  read: boolean
}

type State = {
  emails: Email[]
  selectedEmail: Email | null
  filter: string
  show: 'email-list' | 'email-details' | 'compose-email'
}

const state: State = {
  emails: [
    {
      from: 'Nico',
      header: "Link to today's video and slides is up!",
      content:
        'Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.',
      emailAddress: 'nico@email.com',
      img: 'assets/nico.JPG',
      read: true
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
    },
    {
      from: 'Government',
      header: 'You know what happens next...',
      content: 'MOOOOO! Mwahahahaha.',
      emailAddress: 'government@email.com',
      img: 'assets/gov.jpg',
      read: false
    }
  ],
  selectedEmail: null,
  filter: '',
  show: 'email-list'
}

function selectEmail (email: Email) {
  email.read = true
  state.show = 'email-details'
  state.selectedEmail = email
}

function deselectEmail () {
  state.selectedEmail = null
}

// Q: What emails do we have? ✅ state.emails
// Q: Should we be showing the list or the details of an email? ✅ state.selectedEmail === null ?
// Q: If we are showing an email, which email details should we be showing? ✅ state.selectedEmail

// FILTER FEATURE
// Q: Has the user entered a filter? ✅ state.filter
// Q: What emails should we be showing on the list? state.emails.filter

function getFilteredEmails() {

  return state.emails.filter(
    email =>
      email.content.toLowerCase().includes(state.filter.toLowerCase()) ||
      email.from.toLowerCase().includes(state.filter.toLowerCase()) ||
      email.header.toLowerCase().includes(state.filter.toLowerCase())
  )
}


function renderComposeEmail(){
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  mainEl.textContent = ''

  let titleEl = document.createElement('h1')
  titleEl.textContent = 'Compose Email'

  let formEl = document.createElement('form')
  formEl.className = 'compose-email'

  let fromEl = document.createElement('input')
  fromEl.className = 'compose-email__from'
  fromEl.type = 'email'
  fromEl.placeholder = 'From'

  let toEl = document.createElement('input')
  toEl.className = 'compose-email__to'
  toEl.type = 'email'
  toEl.placeholder = 'To'

  let imageEl = document.createElement('input')
  imageEl.className = 'compose-email__image'
  imageEl.type = 'file'
  imageEl.placeholder = 'Image'

  let headerEl = document.createElement('input')
  headerEl.className = 'compose-email__subject'
  headerEl.type = 'text'
  headerEl.placeholder = 'Write a subject'

  let contentEl = document.createElement('textarea')
  contentEl.className = 'compose-email__content'
  contentEl.placeholder = 'Content'

  let submitEl = document.createElement('button')
  submitEl.className = 'compose-email__submit'
  submitEl.type = 'submit'
  submitEl.textContent = 'Send'
  submitEl.addEventListener('click', function (event) {
    event.preventDefault()
    let toEl = document.querySelector('#to') as HTMLInputElement
    let subjectEl = document.querySelector('#subject') as HTMLInputElement
    let bodyEl = document.querySelector('#body') as HTMLInputElement
    let email = {
      from: fromEl.value,
      header: subjectEl.value,
      content: bodyEl.value,
      emailAddress: toEl.value,
      img: imageEl.value,
      read: false
    }
    state.emails.push(email)
    state.show = 'email-list'
  })

  formEl.append(fromEl, toEl, headerEl, contentEl, imageEl, submitEl)

  mainEl.append(titleEl, formEl)
}

function renderEmailListItem (email: Email, listEl: HTMLUListElement) {
  let liEl = document.createElement('li')
  liEl.className = email.read ? 'emails-list__item read' : 'emails-list__item'
  liEl.addEventListener('click', function () {
    selectEmail(email)
    render()
  })

  // if (email.read) liEl.className = 'emails-list__item read'
  // else liEl.className = 'emails-list__item'

  // liEl.className = 'emails-list__item'
  // if (email.read) liEl.classList.add('read')

  let readIconEl = document.createElement('span')
  readIconEl.className =
    'emails-list__item__read-icon material-symbols-outlined'
  readIconEl.textContent = email.read ? 'mark_email_read' : 'mark_email_unread'

  let imgEl = document.createElement('img')
  imgEl.className = 'emails-list__item__image'
  imgEl.src = email.img

  let fromEl = document.createElement('p')
  fromEl.classList.add('emails-list__item__from')
  fromEl.textContent = email.from

  let contentEl = document.createElement('p')
  contentEl.className = 'emails-list__item__content'
  contentEl.textContent = email.header
  liEl.append(readIconEl, imgEl, fromEl, contentEl)

  listEl.appendChild(liEl)
}

function renderEmailList () {
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  mainEl.textContent = ''

  let titleEl = document.createElement('h1')
  titleEl.textContent = 'Inbox'

  let composeEl = document.createElement('button')
  composeEl.className = 'compose-email__compose'
  composeEl.textContent = 'Compose'
  composeEl.addEventListener('click', function () {
    state.show = 'compose-email'
    render()
  })

  titleEl.append(composeEl)

  let listEl = document.createElement('ul')
  listEl.className = 'emails-list'

  for (let email of getFilteredEmails()) {
    renderEmailListItem(email, listEl)
  }

  mainEl.append(titleEl, listEl)
}

function renderEmailDetails () {
  let mainEl = document.querySelector('main')
  if (mainEl === null) return
  if (state.selectedEmail === null) return

  mainEl.textContent = ''

  let backButton = document.createElement('button')
  backButton.textContent = 'BACK'
  backButton.addEventListener('click', function () {
    deselectEmail()
    render()
  })

  let titleEl = document.createElement('h1')
  titleEl.textContent = state.selectedEmail.from

  let imgEl = document.createElement('img')
  imgEl.className = 'email-details__image'
  imgEl.src = state.selectedEmail.img

  let headerEl = document.createElement('h2')
  headerEl.className = 'email-details__header'
  headerEl.textContent = state.selectedEmail.header

  let contentEl = document.createElement('p')
  contentEl.className = 'email-details__content'
  contentEl.textContent = state.selectedEmail.content

  mainEl.append(backButton, titleEl, imgEl, headerEl, contentEl)
}

function render () {
  if (state.show === 'email-details') renderEmailDetails()
  if (state.show === 'email-list')renderEmailList()
  if (state.show === 'compose-email') renderComposeEmail()
  
}

function runThisOnlyAtTheStart () {

  let inputEl = document.querySelector<HTMLInputElement>('.filter-input')

  let formEl = document.querySelector('form')
  formEl?.addEventListener("submit", function (event){
    event.preventDefault()
    if(!inputEl) return
    state.filter = inputEl.value
    render()
  })

  let logoEl = document.querySelector('.logo')
  if (logoEl) {
    logoEl.addEventListener('click', function () {
      deselectEmail()
      render()
    })
  }

}



window.state = state

runThisOnlyAtTheStart()
render()