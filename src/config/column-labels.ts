export const columnLabelsByResource: Record<string, Record<string, string>> = {
  authors: {
    AuthorID: 'ID',
    Name: 'Nombre',
    NationalityName: 'Nacionalidad',
    LiteraryGenreName: 'Género literario',
    Status: 'Estado',
    Photo: 'Foto',
  },
  books: {
    BookID: 'ID',
    Title: 'Título',
    AvailableCopies: 'Ej. disp.',
    LoanedCopies: 'Ej. pres.',
    AuthorName: 'Autor',
    PublisherName: 'Editorial',
    Status: 'Estado',
  },
  courses: {
    CourseID: 'ID',
    Name: 'Nombre',
    Level: 'Nivel',
    Description: 'Descripción',
    Status: 'Estado',
  },
  loans: {
    code: 'Código',
    readerCode: 'Código lector',
    readerFullName: 'Nombre lector',
    loanDate: 'Fecha préstamo',
    itemCount: 'Ejemplares',
    statusCounts: 'Estados',
    id: 'ID',
  },
  publishers: {
    PublisherID: 'ID',
    Name: 'Nombre',
    NationalityName: 'Nacionalidad',
    LiteraryGenreName: 'Género literario',
    Status: 'Estado',
    Photo: 'Foto',
  },
  students: {
    StudentID: 'ID',
    DNI: 'DNI',
    FirstName: 'Nombres',
    LastName: 'Apellidos',
    Phone: 'Teléfono',
    Email: 'Correo electrónico',
    Status: 'Estado',
  },
  users: {
    UserID: 'ID',
    Username: 'Nombre de usuario',
    Email: 'Correo electrónico',
    FirstName: 'Nombres',
    LastName: 'Apellidos',
    Role: 'Rol',
    ProfilePhoto: 'Foto',
  },
}

export function getColumnLabel(resource: string, columnId: string): string {
  return columnLabelsByResource[resource]?.[columnId] ?? columnId
}
