import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import './calendar.css';
import icon from '../../assets/icon.jpg';
import { ifetchWrapper } from '../../../public/fetchWrapper.js';

function Calendar() {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [participants, setParticipants] = useState([{ name: '' }]);
  const [savedEvents, setSavedEvents] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleEventTimeChange = (event) => {
    setEventTime(event.target.value);
  };

  const handleParticipantChange = (index, newValue) => {
    const newParticipants = [...participants];
    newParticipants[index].name = newValue;
    setParticipants(newParticipants);
  };

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: '' }]);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleSaveEvent = () => {
    setSavedEvents([...savedEvents, {
      name: eventName,
      description: eventDescription,
      date: eventDate,
      time: eventTime,
      participants: participants.map(participant => participant.name)
    }]);
    setEventName('');
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setParticipants([{ name: '' }]);
    handleClose();
  };

  async function handleLogout() {
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-nav">
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/calendar">Calendario</Link></li>
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/login" onClick={handleLogout}>Cerrar sesión</Link></li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>
          <img src={icon} alt="Icon" className="icono-img" />
          ABC ProjectManager
        </h1>
        <div>
          <Button variant="contained" onClick={handleClickOpen}>Agregar Actividad</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Actividad</DialogTitle>
            <DialogContent>
              <TextField
                label="Nombre de la Actividad"
                value={eventName}
                onChange={handleEventNameChange}
              />
              <TextField
                label="Descripción de la Actividad"
                value={eventDescription}
                onChange={handleEventDescriptionChange}
              />
              <TextField
                label="Fecha de la Actividad"
                type="date"
                value={eventDate}
                onChange={handleEventDateChange}
              />
              <TextField
                label="Hora de la Actividad"
                type="time"
                value={eventTime}
                onChange={handleEventTimeChange}
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Participantes</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={participant.name}
                          onChange={(event) => handleParticipantChange(index, event.target.value)}
                        >
                          <MenuItem value="">Seleccionar</MenuItem>
                          <MenuItem value="Participant 1">Participant 1</MenuItem>
                          <MenuItem value="Participant 2">Participant 2</MenuItem>
                          <MenuItem value="Participant 3">Participant 3</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveParticipant(index)}>
                          <RemoveCircleOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outlined" onClick={handleAddParticipant}>Agregar Participante</Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSaveEvent}>Guardar</Button>
            </DialogActions>
          </Dialog>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Participantes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.participants.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      </div>
  )
}

export default Calendar;
