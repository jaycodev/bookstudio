export const columnLabelsByResource: Record<string, Record<string, string>> = {
  authors: {
    AuthorID: 'Id',
    Name: 'Nombre',
    NationalityName: 'Nacionalidad',
    LiteraryGenreName: 'Género literario',
    Status: 'Estado',
    Photo: 'Foto',
  },
  books: {
    BookID: 'Id',
    Title: 'Título',
    AvailableCopies: 'Disponibles',
    LoanedCopies: 'Prestados',
    AuthorName: 'Autor',
    PublisherName: 'Editorial',
    Status: 'Estado',
  },
  courses: {
    CourseID: 'Id',
    Name: 'Nombre',
    Level: 'Nivel',
    Description: 'Descripción',
    Status: 'Estado',
  },
  loans: {
    LoanID: 'Id',
    BookTitle: 'Libro',
    StudentDNI: 'Estudiante - DNI',
    LoanDate: 'Préstamo',
    ReturnDate: 'Devolución',
    Quantity: 'Cantidad',
    Status: 'Estado',
  },
  publishers: {
    PublisherID: 'Id',
    Name: 'Nombre',
    NationalityName: 'Nacionalidad',
    LiteraryGenreName: 'Género literario',
    Status: 'Estado',
    Photo: 'Foto',
  },
  students: {
    StudentID: 'Id',
    DNI: 'DNI',
    FirstName: 'Nombres',
    LastName: 'Apellidos',
    Phone: 'Teléfono',
    Email: 'Correo electrónico',
    Status: 'Estado',
  },
  users: {
    UserID: 'Id',
    Username: 'Nombre de usuario',
    Email: 'Correo electrónico',
    FirstName: 'Nombres',
    LastName: 'Apellidos',
    Role: 'Rol',
    ProfilePhoto: 'Foto de perfil',
  },
}

export function getColumnLabel(resource: string, columnId: string): string {
  return columnLabelsByResource[resource]?.[columnId] ?? columnId
}
