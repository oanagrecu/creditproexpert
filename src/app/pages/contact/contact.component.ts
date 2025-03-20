import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ContactComponent {
  successMessage: string = '';

  sendEmail(form: NgForm) {
    if (form.valid) {
      const formData = {
        'first-name': form.value.firstName,
        'last-name': form.value.lastName,
        'user-email': form.value.email,
        'phone-number': form.value.phone,
        message: form.value.message,
      };

      emailjs
        .send(
          'service_yf2o8r8',
          'template_wuy5gwh',
          formData,
          'oLw9x7hYw639pF01B'
        )
        .then(
          (result) => {
            console.log('Email sent successfully!', result.text);
            this.successMessage = 'Your message has been sent successfully! ✅';

            setTimeout(() => {
              this.successMessage = '';
              form.reset();
            }, 3000);
          },
          (error) => {
            console.error('Error sending email:', error.text);
            this.successMessage =
              'Oops! Something went wrong. ❌ Please try again.';
          }
        );
    }
  }
}
