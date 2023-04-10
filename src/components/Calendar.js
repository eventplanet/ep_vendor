import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import init from './../firebase'
import { useUserAuth } from '../context/UserAuthContext';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Button, Modal, Form } from 'react-bootstrap';
const Calendar = () => {
    const { user } = useUserAuth();
    const merchant_id = user.uid;
    const [merchant, setMerchant] = useState({});
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [events, setEvents] = useState([])

    console.log('current events', events)
    const getSingleDocumentHandler = async () => {
        try {
            console.log(`fetching document data  for merchant Id ${merchant_id}`)
            const res = await getDoc(doc(init.db, "merchants", merchant_id));
            setMerchant(res.data());
            setEvents(res.data().calendar)

        } catch (error) {
            console.log(`Error ${error} `)
        }

    }
    useEffect(() => {
        getSingleDocumentHandler()
    }, [merchant_id])
    const handleClose = () => {
        setShow(false);
    }

    const handleSelection = (e) => {
        setStartDate(e.startStr);
        setEndDate(e.endStr);
        setShow(true);
    }
    const addEvent = (e) => {
        e.preventDefault();

        const allEvents = [...events, {
            title,
            start: startDate,
            end: endDate
        }];

        setEvents(allEvents)
        setTitle('')
        setShow(false);
        updateCalendar(allEvents)

    }
    const updateCalendar = async (allEvents) => {
        try {
            await setDoc(doc(init.db, "merchants", merchant_id), {
                ...merchant,
                calendar: allEvents
            }, { merge: true });
            toast.success('Data Updated Successfully');
        } catch (err) {
            console.log(err)
        }
    }


    const handleDrop = (info) => {
        console.log(info.event)
        console.log(info.event.title)
        console.log(info.event.startStr)
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header bg-white'>
                                <p><b>Update Your Calendar</b></p>
                            </div>
                            <div className='card-body'>

                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView='dayGridMonth'
                                    weekends={true}
                                    droppable={true}
                                    events={events && events}
                                    selectable={true}
                                    eventContent={renderEventContent}
                                    eventColor='green'
                                    select={handleSelection}
                                    eventClick={handleDrop}
                                />
                                <Modal show={show} onHide={handleClose}>
                                    <Form onSubmit={addEvent}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Event</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Event Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Add Event Title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </Form.Group>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button type="submit" variant="primary" >
                                                Add Event
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
function renderEventContent(eventInfo) {
    return <i>{eventInfo.event.title}</i>
}
export default Calendar