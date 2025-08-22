'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import axios from "axios"
import { Loader2Icon } from "lucide-react"

function CourseFormDialog() {
    const router = useRouter();
    const [DataForm, setDataForm] = useState({ Name: "", Description: "", NumbreChapetrs: 1, IncludeVideo: false, ChooseLevel: "", Category: "" })
    const [Loading, setLoading] = useState(false)
    console.log(DataForm)
    const onGenerateCourse = async () => {
        setLoading(true)
        const result = await axios.post("/api/GenerateCourse", {
            ...DataForm
        })
        console.log(result.data)
        setLoading(false)
        router.push("/dashboard/edit-course/" + result.data.courseid)


    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button>+ Create New Cours</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Course With Ai</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2 mb-2">
                        <label>Course Name</label>
                        <Input value={DataForm.Name} onChange={(e) => {
                            setDataForm({ ...DataForm, Name: e.target.value })
                        }} type="text" placeholder="Course Name" />
                    </div>
                    <div className="mt-2 mb-2">
                        <label>Course Description</label>
                        <Textarea value={DataForm.Description} onChange={(e) => {
                            setDataForm({ ...DataForm, Description: e.target.value })
                        }} placeholder="Course Description" />
                    </div>
                    <div className="mt-2 mb-2">
                        <label>Numbre of Chapetrs</label>
                        <Input value={DataForm.NumbreChapetrs} onChange={(e) => {
                            setDataForm({ ...DataForm, NumbreChapetrs: e.target.value })
                        }} type="number" placeholder="Numbre of Chapetrs" />
                    </div>
                    <div className="mt-2 mb-2">
                        <label className=" mr-2" >Include Video</label>
                        <Switch checked={DataForm.IncludeVideo} onCheckedChange={(e) => {
                            setDataForm({ ...DataForm, IncludeVideo: e })
                        }} />
                    </div>
                    <div className="mt-2 mb-2">
                        <Select value={DataForm.ChooseLevel} onValueChange={(e) => {
                            setDataForm({ ...DataForm, ChooseLevel: e })
                        }} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div >
                    <div className="mt-2 mb-2">
                        <label>Category</label>
                        <Input value={DataForm.Category} onChange={(e) => {
                            setDataForm({ ...DataForm, Category: e.target.value })
                        }} type="text" placeholder="Category" />
                    </div>
                    <div className="mt-2 mb-2">
                        <Button onClick={onGenerateCourse} className="w-full" >{Loading ? <Loader2Icon className="animate-spin" /> : <span>Generate Course</span>}</Button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CourseFormDialog
