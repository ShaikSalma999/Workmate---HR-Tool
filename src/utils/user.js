import { profileA, profileB } from '../assets'

export const userAvatar = (user) => (user?.avatar === 'b' ? profileB : profileA)
