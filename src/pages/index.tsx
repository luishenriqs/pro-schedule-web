import NewSchedule from '@pages/NewSchedule'
import MyAgenda from '@pages/MyAgenda'
import { useUser } from '@common/hooks/contexts/UserContext'

export default function Home() {
    const { user } = useUser()
    return user?.isAdmin ? <MyAgenda /> : <NewSchedule />
}
