import React, { useState, useEffect } from 'react'
import api from '../api'

import Modal from '../Students/StudentsModalForm'

const StudentsList = () => {

    const [filter, setFilter ] = useState('')
    const [ students, setStudents ] = useState([])
    const [ studentModal, setStudentModal ] = useState('')
    const [ modalShow, setModalShow ] = useState(false)

    useEffect(() => {
        document.title = 'Alunos e País'

        async function students(){
            let { data } = await api.getStudentsInvitations()
            setStudents(data)
        }
       students()
        
        //setStudents
    }, [])

    function handleFilter(e){
        
        setFilter(e.target.value)
        getStudents(filter)
    }
    async function getStudents(filter){
        let { data } = await api.filterStudentsInvitations(filter)
        setStudents( data )
         
    }

    async function handleClick(ra){
        console.log(ra)
    }

    return(
        <div className="container-fluid pt-custom">
            <div className="row mb-3 ml-2 border-bottom">
                <div className="col-12">
                    <h2>Alunos e País</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <input  className="form-control form-control-lg mb-2"  placeholder="Nome do Aluno, Pai ou Mãe" onChange = {handleFilter} onKeyUp = {handleFilter}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <ul className="list-group">
                        {students.map( r => 
                            <li key={r.ra} onClick={() => handleClick(r.ra)}className="list-group-item" >
                                <div className="float-right">{r.invitation && r.invitation+' | \u{1F609} Tenho Convite'}</div>
                                <div>{r.name}</div>
                                <div><sub>{r.father} | {r.mother}</sub></div>
                            </li>
                        )}
                        {students.length === 0 &&  filter.length > 0 &&
                            <li className="list-group-item">Não Encontrado</li>
                        }

                    </ul>
                </div>
            </div>

        </div>
    )

}

export default StudentsList
