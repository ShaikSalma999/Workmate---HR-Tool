import {
  chatPhoto,
  contactAvatars,
  notifDoc,
  notifMeeting,
  avatarBlue,
  avatarGreen,
  avatarOrange,
  avatarPeach,
  avatarPink,
  taskMain,
  taskThumb1,
  taskThumb2,
} from '../assets'

export const currentUser = {
  name: 'Tonald Drump',
  role: 'Junior Full Stack Developer',
  email: 'Tonald@work.com',
  avatar: avatarPink,
}

export const meetings = [
  { id: 1, title: 'Townhall Meeting', time: '01:30 AM - 02:00 AM', people: [avatarOrange, avatarGreen, avatarPeach], extra: '+3' },
  { id: 2, title: 'Dashboard Report', time: '01:30 AM - 02:00 AM', people: [avatarPeach, avatarBlue, avatarGreen] },
]

// ---- Tasks ---------------------------------------------------------------
export const tasks = [
  { id: 1, title: 'Wiring Dashboard Analytics', status: 'In Progress', priority: 'High', progress: 90, due: '27 Sept', comments: 2, team: [avatarOrange, avatarGreen, avatarPeach] },
  { id: 2, title: 'API Dashboard Analytics Integration', status: 'In Progress', priority: 'High', progress: 60, due: '27 Sept', comments: 2, team: [avatarOrange, avatarGreen, avatarPeach] },
  { id: 3, title: 'Slicing Dashboard Analytics', status: 'Done', priority: 'High', progress: 100, due: '27 Sept', comments: 2, team: [avatarOrange, avatarGreen, avatarPeach] },
]

export const taskSummary = { todo: 5, inProgress: 2, done: 1 }

export const burnout = {
  level: 'Good',
  message: 'You’ve completed 4 more tasks than usual, maintain your task with your supervisor',
  fill: 20,
  sprint: 'Sprint 20',
  workingLevel: [
    { label: 'Sprint 1', value: 95 },
    { label: 'Sprint 2', value: 101 },
    { label: 'Sprint 3', value: 95 },
    { label: 'Sprint 4', value: 113 },
    { label: 'Sprint 5', value: 108 },
  ],
  workingPeriod: [
    { label: 'May', value: 40 },
    { label: 'Jun', value: 40 },
    { label: 'Jul', value: 40 },
    { label: 'Aug', value: 46 },
    { label: 'Sept', value: 40 },
  ],
}

export const taskDetail = {
  created: 'Created 27 Sept 2024',
  description:
    'Create on boarding page based on pic, pixel perfect, with the user story of i want to know what kind of apps is this so i need to view onboarding screen to leverage my knowledge so that i know what kind of apps is this',
  priority: 'High',
  difficulty: 'Very Easy (Less Than a Day)',
  assignee: { name: 'Alice', role: 'Sr Front End Developer', avatar: avatarOrange },
  images: [taskMain, taskThumb1, taskThumb2],
  comments: [
    { id: 1, name: 'Jason', role: 'Product Manager', at: '28 Sept 2024 5:53 AM', text: 'Dude, how long it will take? any blocker? need the update asap', avatar: avatarPink },
    { id: 2, name: 'Alice', role: 'Sr Front End Developer', at: '29 Sept 2024 5:53 AM', text: '@Jason still testing, will be push at 04:00 PM', avatar: avatarOrange },
  ],
}

export const members = [
  'Ivankov - Sr Front End Developer',
  'Brahm - Mid Front End Developer',
  'Alice - Sr Front End Developer',
  'Jeane - Jr Front End Developer',
  'Claudia - Jr Front End Developer',
]
export const priorities = ['Low', 'Medium', 'High']
export const difficulties = [
  'Very Easy (Less Than a Day)',
  'Easy (A Day)',
  'Moderate (3 Days)',
  'Intermediate (5 Days)',
  'Advanced (1 Week)',
]

export const attendanceHistory = [
  { date: '27 September 2024', hours: '08:00:00 hrs', range: '09:00 AM — 05:00 PM' },
  { date: '26 September 2024', hours: '08:00:00 hrs', range: '09:00 AM — 05:00 PM' },
  { date: '25 September 2024', hours: '08:10:00 hrs', range: '09:00 AM — 05:10 PM' },
]
export const todayEntry = { date: '28 September 2024', hours: '08:00:00 hrs', range: '09:00 AM — 05:00 PM' }

export const expenseSummary = { total: '$1010', review: '$455', approved: '$555' }

export const expenses = {
  review: [
    { id: 1, date: '27 September 2024', type: 'E-Learning', amount: '$55' },
    { id: 2, date: '24 September 2024', type: 'E-Learning', amount: '$55' },
    { id: 3, date: '21 September 2024', type: 'E-Learning', amount: '$55' },
  ],
  approved: [
    { id: 4, date: '18 September 2024', type: 'E-Learning', amount: '$55', outcome: { status: 'approved', text: 'Approved at 19 Sept 2024', by: 'Elaine' } },
    { id: 5, date: '14 September 2024', type: 'E-Learning', amount: '$55', outcome: { status: 'approved', text: 'Approved at 19 Sept 2024', by: 'Elaine' } },
  ],
  rejected: [
    { id: 6, date: '27 September 2024', type: 'Business Trip', amount: '$100', outcome: { status: 'rejected', text: 'Rejected at 28 Sept 2024', by: 'Elaine' } },
    { id: 7, date: '24 September 2024', type: 'Business Trip', amount: '$100', outcome: { status: 'rejected', text: 'Rejected at 28 Sept 2024', by: 'Elaine' } },
  ],
}

export const expenseCategories = [
  'Business Trip',
  'Office Supplies',
  'Meals and Entertainment',
  'Professional Development',
  'Home Office Expenses',
  'Mileage Reimbursement',
  'Miscellaneous Expenses',
]

export const leaveSummary = { available: 20, used: 2 }

export const leaves = {
  review: [{ id: 1, date: '10 November 2024', range: '11 Nov - 13 Nov', total: '2 Days' }],
  approved: [
    { id: 2, date: '18 September 2024', range: '20 Sept - 22 Sept', total: '2 Days', outcome: { status: 'approved', text: 'Approved at 19 Sept 2024', by: 'Elaine' } },
  ],
  rejected: [
    { id: 3, date: '21 September 2024', range: '10 Nov - 17 Nov', total: '7 Days', outcome: { status: 'rejected', text: 'Rejected at 22 Sept 2024', by: 'Elaine' } },
  ],
}

export const leaveCategories = [
  'Sick Leave',
  'Annual Leave/Vacation Leave',
  'Maternity/Paternity Leave',
  'Bereavement Leave',
  'Personal Leave',
  'Jury Duty Leave',
  'Compassionate Leave',
]

export const delegates = [
  'Jeane - UX Writer',
  'Alpheas - UI Designer',
  'John - UX Designer',
  'Alicia - Jr Product Manager',
  'Claudia - UI Designer',
]

const preview = 'Ey Tonald, let’s do the design sprint at friday 10.00 am'

export const contacts = [
  { id: 'alicia', name: 'Alicia Rochefort', avatar: contactAvatars.alicia },
  { id: 'jessica', name: 'Jessica Tan', avatar: contactAvatars.jessica },
  { id: 'lolita', name: 'Lolita Xue', avatar: contactAvatars.lolita },
  { id: 'eaj', name: 'Eaj Prakk', avatar: contactAvatars.eaj },
  { id: 'jason', name: 'Jason', avatar: contactAvatars.jason },
  { id: 'kimberly', name: 'Kimberly', avatar: contactAvatars.kimberly },
  { id: 'wang', name: 'Wang', avatar: contactAvatars.wang },
  { id: 'james', name: 'James', avatar: contactAvatars.james },
  { id: 'bella', name: 'Bella', avatar: contactAvatars.bella },
]

export const seedChats = {
  alicia: [
    { id: 'a1', from: 'them', text: 'Hey Tonald, we have to attend our daily stand up', time: '09.10' },
    { id: 'a2', from: 'me', text: 'Sure, when will daily stand up starts?', time: '09.12' },
    { id: 'a3', from: 'them', text: 'It’s around 11.00, in the meeting room', time: '09.13' },
    { id: 'a4', from: 'them', text: 'btw, don’t forget bring the sunday report ya', time: '09.13' },
    { id: 'a5', from: 'them', text: 'See you there!', time: '09.13' },
    { id: 'a6', from: 'me', text: 'Okay Alicia, I’ll make sure to attend the daily stand up and make sure everything goes well, and bring the sunday report to you, see you there at 11.00 Alicia!', time: '09.14' },
  ],
  jessica: [
    { id: 'j1', from: 'them', text: 'Hey Tonald, send me picture of our teamwork for IG post', time: '09.10' },
    { id: 'j2', from: 'me', text: 'Sure, wait, i’ll send you', time: '09.12' },
    { id: 'j3', from: 'me', image: chatPhoto, time: '09.12' },
    { id: 'j4', from: 'them', text: 'Thanks Tonald!', time: '09.13' },
    { id: 'j5', from: 'me', text: 'you’re welcome jess!', time: '09.14' },
  ],
}
contacts.slice(2).forEach(({ id }) => {
  seedChats[id] = [{ id: `${id}-1`, from: 'them', text: preview, time: '09.10' }]
})

export const autoReplies = [
  'Got it, thanks!',
  'Sounds good to me 👍',
  'Okay, let’s talk about it later today.',
  'Noted! I’ll check and get back to you.',
  'Haha nice, see you at the stand up.',
]

export const seedNotifications = [
  {
    id: 'n1',
    title: 'New Task Assigned to You!',
    body: 'You have new task for this sprint from Alicia, you can check your task “Create Onboarding Screen” by tap here',
    time: '09.10',
    to: '/tasks',
    icon: notifDoc,
    read: false,
  },
  {
    id: 'n2',
    title: 'Expense has been approved!',
    body: 'Your expense has been been approved by jessica, view expense report here',
    time: '09.10',
    to: '/expense',
    icon: notifDoc,
    read: false,
  },
  {
    id: 'n3',
    title: 'You have invited in meeting!',
    body: 'You have been invited to a meeting. Tap to find the meeting details',
    time: '09.10',
    to: '/home',
    icon: notifMeeting,
    read: false,
  },
]
export { notifDoc, notifMeeting }

export const positions = [
  'Junior Full Stack Developer',
  'Sr Front End Developer',
  'UI Designer',
  'Product Manager',
  'Team Member',
]
export const countries = ['Indonesia', 'India', 'Singapore', 'Malaysia']
export const states = ['DKI Jakarta', 'West Java', 'Telangana', 'Selangor']
export const cities = ['Jakarta Selatan', 'Bandung', 'Hyderabad', 'Kuala Lumpur']

export const payroll = [
  { id: 'sep-2024', month: 'September 2024', paid: '30 Sept 2024' },
  { id: 'aug-2024', month: 'August 2024', paid: '30 Aug 2024' },
  { id: 'jul-2024', month: 'July 2024', paid: '30 Jul 2024' },
  { id: 'jun-2024', month: 'June 2024', paid: '30 Jun 2024' },
  { id: 'may-2024', month: 'May 2024', paid: '30 May 2024' },
  { id: 'apr-2024', month: 'April 2024', paid: '30 Apr 2024' },
].map((p) => ({
  ...p,
  hours: '40:00:00 hrs',
  received: '$800',
  basic: 700,
  tax: 70,
  reimbursement: 70,
  bonus: 100,
  overtime: 0,
}))

export const officeAsset = {
  name: 'Laptop Macbook Air M1 2020',
  brand: 'Apple',
  warranty: 'Off',
  buyingDate: '12 September 2020',
  receivedOn: '14 September 2020',
}

export const faqs = [
  ['How do I clock in?', 'Open the Attendance tab, press Clock In, confirm you are inside the clock-in area and take a selfie.'],
  ['Can I edit my working hours?', 'Hours can’t be edited after you clock out. Contact HR if something looks wrong.'],
  ['How long does an expense take to approve?', 'Most claims are reviewed within three working days and paid with your payroll.'],
  ['How do I change my password?', 'Go to Profile > Settings > Change Password and enter your current and new password.'],
]
