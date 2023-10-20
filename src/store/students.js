import { reactive } from 'vue'
import { getStudentByName, getStudents, updateStudentApproval } from '@/API/students'

const state = reactive({
    students: [],
    error: null,
    loading: false
})

const getStudentsList = async () => {
    state.loading = true
    try {
        state.students = await getStudents()
    } catch (error) {
        state.error = error.message
    } finally {
        state.loading = false
    }
}

const fetchStudentByName = async (name) => {
    state.loading = true
    try {
        state.students = await getStudentByName(name)
    } catch (error) {
        state.error = error.message
    } finally {
        state.loading = false
    }
}

const setStudentApproval = async (studentId, approve) => {
    state.loading = true
    try {
        await updateStudentApproval(studentId, approve)
        // Update the local list of students if necessary or refetch them
        const studentIndex = state.students.findIndex((student) => student._id === studentId)
        if (studentIndex > -1) {
            state.students[studentIndex].approved = approve
        }
    } catch (error) {
        state.error = error.message
    } finally {
        state.loading = false
    }
}

export const useStudentsStore = () => {
    return {
        state,
        getStudentsList,
        fetchStudentByName,
        setStudentApproval
    }
}
