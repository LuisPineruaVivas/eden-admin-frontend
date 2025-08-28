import { IGroup } from '@interfaces/models'
import { GroupsTableActions } from './GroupsTableActions'
import type { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/Avatar'

export const groupsColumns: ColumnDef<IGroup>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const group = row.original
      return (
        <div className="font-medium">
          {group.name}
        </div>
      )
    },
  },
  {
    accessorKey: 'supervisor',
    header: 'Supervisado por',
    cell: ({ row }) => {
      const group = row.original
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={group.supervisor.avatar ? `${import.meta.env.VITE_API_URL}/${group.supervisor.avatar}` : undefined}
              alt={group.supervisor.name}
            />
            <AvatarFallback>
              {group.supervisor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span>{group.supervisor.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'participants',
    header: 'Participantes',
    cell: ({ row }) => {
      const group = row.original
      const visibleParticipants = group.participants.slice(0, 3)
      const remainingCount = group.participantCount - 3
      
      return (
        <div className="flex items-center space-x-1">
          <div className="flex -space-x-2">
            {visibleParticipants.map((participant) => (
              <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage
                  src={participant.avatar ? `${import.meta.env.VITE_API_URL}/${participant.avatar}` : undefined}
                  alt={participant.name}
                />
                <AvatarFallback className="text-xs">
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {remainingCount > 0 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium border-2 border-background">
              +{remainingCount}
            </div>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => <GroupsTableActions group={row.original} />,
    meta: { className: 'text-right' },
  },
]
