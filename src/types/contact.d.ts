export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'PENDING' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  contact?: Contact;
} 