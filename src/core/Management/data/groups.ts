import { z } from 'zod'
import { faker } from '@faker-js/faker'

const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullable(),
})

const supervisorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullable(),
})

const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  supervisor: supervisorSchema,
  participants: z.array(participantSchema),
  participantCount: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Group = z.infer<typeof groupSchema>
export type Participant = z.infer<typeof participantSchema>
export type Supervisor = z.infer<typeof supervisorSchema>

export const groupListSchema = z.array(groupSchema)

// Datos de prueba para mostrar en la tabla de grupos
export const mockGroups = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.company.name(),
  supervisor: {
    id: i + 1,
    name: faker.person.fullName(),
    avatar: null
  },
  participants: Array.from({ length: 10 }, (_, j) => ({
    id: j + 1,
    name: faker.person.fullName(),
    avatar: null
  })),
  participantCount: 10,
  created_at: new Date(),
  updated_at: new Date()
  
}))