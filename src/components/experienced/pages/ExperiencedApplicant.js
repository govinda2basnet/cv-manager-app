import React, { useState } from 'react'
import { Table } from 'antd'
import ExperiencedApplicantList from '../components/ExperiencedApplicantList'
export default function ExperiencedApplicant(){
  const expList= [
    {
      id:1,
      fullName: 'Kopil Bhusal',
      phoneNumber: '9836728890',
      email: 'kopilfgs@gmail.com',
      level: 'Assosiate',
      references:"facebook",
      technology: 'DevOps',
      status: 'Hired',
      expectedSalary: 50000,
      resume: 'resume.pdf',
      experiences: [
        {
          companyName: 'Amnil Technologies',
          startedDate: '2020-01-01',
          endDate: '2022-12-31',
          position: 'Software Engineer',
          responsibilities: 'Developed and maintained web applications.',
          certificates: ['certificate1.jpg', 'certificate2.pdf'],
        },
        
        {
          companyName: 'Krimson Corporation',
          startedDate: '2018-06-01',
          endDate: '2019-12-31',
          position: 'Intern',
          responsibilities: 'Assisted with testing and debugging.',
          certificates: ['certificate3.png'],
        },
      ]
    },
      {
        id:2,
        fullName: 'Govinda Basnet',
        phoneNumber: '9810108505',
        email: 'awesomebasnet2@example.com',
        level: 'Intermediate',
        references: "linkedIn",
        status: 'Available',
        expectedSalary: 50000,
        resume: 'resume.pdf',
        experiences: [
          {
            companyName: 'f1soft',
            startedDate: '2020-05-01',
            endDate: '2022-12-1',
            position: 'Software Engineer',
            responsibilities: 'Developed b applications.',
            certificates: ['certificate1.jpg', 'certificate2.pdf'],
          },
          
        ]
        },
        {
          id:3,
          fullName: 'Aman Dangol',
          phoneNumber: '9845637890',
          email: 'ixestha@gmail.com',
          level: 'Assosiate',
          references:"LinkedIn",
          technology: 'Nodejs',
          status: 'Hired',
          expectedSalary: 40000,
          resume: 'resume.pdf',
          experiences: [
            {
              companyName: 'Avogado Technologies',
              startedDate: '2020-01-01',
              endDate: '2022-12-31',
              position: 'Software Engineer',
              responsibilities: 'Developed and maintained web applications.',
              certificates: ['certificate1.jpg', 'certificate2.pdf'],
            },
            {
              companyName: 'Leafrog Technologies',
              startedDate: '2018-06-01',
              endDate: '2019-12-31',
              position: 'Intern',
              responsibilities: 'Assisted with testing and debugging.',
              certificates: ['certificate3.png'],
            },
          ]
          },
          {
            id:4,
            fullName: 'Dikshya Basnet',
            phoneNumber: '9745667890',
            email: 'dikshyaiam@example.com',
            level: 'Intern',
            references: "linkedIn",
            technology:"QA",
            status: 'Available',
            expectedSalary: 30000,
            resume: 'resume.pdf',
            experiences: [
              {
                companyName: 'Verix technologies',
                startedDate: '2020-01-01',
                endDate: '2022-12-31',
                position: ' QA',
                responsibilities: 'Developed and maintained web applications.',
                certificates: ['certificate1.jpg', 'certificate2.pdf'],
              },
              {
                companyName: 'Nirvana technologies',
                startedDate: '2018-06-01',
                endDate: '2019-12-31',
                position: 'Senior',
                responsibilities: 'Assisted with testing and debugging.',
                certificates: ['certificate3.png'],
              },
            ]
            }
  ]
  return (
  <>
  <ExperiencedApplicantList  props={expList}/>
  
  </>
  )
}
