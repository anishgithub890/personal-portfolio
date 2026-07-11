import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME || 'mahatoanish284@gmail.com',
    pass: process.env.SMTP_PASSWORD || 'cbfzjlxpxakfnbzp',
  },
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(emailData: EmailData) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || 'mahatoanish284@gmail.com',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || emailData.html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendMessageNotification(
  senderName: string,
  senderEmail: string,
  receiverName: string,
  receiverEmail: string,
  messageContent: string,
  messageType: 'user_to_admin' | 'admin_to_user' | 'contact_form'
) {
  const adminEmail = 'mahatoanish284@gmail.com';
  
  if (messageType === 'user_to_admin') {
    // Send notification to admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Message from User</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>From:</strong> ${senderName} (${senderEmail})</p>
          <p><strong>To:</strong> ${receiverName}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${messageContent.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 14px;">
          You can respond to this message through your admin dashboard at: 
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/chat">Admin Chat</a>
        </p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `New Message from ${senderName}`,
      html: adminHtml,
    });

    // Send confirmation to user
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Message Sent Successfully</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Your message has been sent to our support team.</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${messageContent.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 14px;">
          We'll get back to you as soon as possible. You can also check your chat history at: 
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/chat">Chat</a>
        </p>
      </div>
    `;

    await sendEmail({
      to: senderEmail,
      subject: 'Message Sent - Support Team',
      html: userHtml,
    });

  } else if (messageType === 'admin_to_user') {
    // Send notification to user
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Message from Support Team</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>From:</strong> ${senderName} (Support Team)</p>
          <p><strong>To:</strong> ${receiverName}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${messageContent.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 14px;">
          You can view this message and respond at: 
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/chat">Chat</a>
        </p>
      </div>
    `;

    await sendEmail({
      to: receiverEmail,
      subject: `New Message from Support Team`,
      html: userHtml,
    });

  } else if (messageType === 'contact_form') {
    // Send notification to admin for contact form
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; width: 100%; margin: 0 auto; border: 1px solid #e1e4e8; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px 20px; text-align: center;">
          <h2 style="color: white; margin: 0; font-weight: 600; font-size: 24px;">New Contact Form Submission</h2>
        </div>
        
        <!-- Notification Info -->
        <div style="background-color: #f9f9f9; padding: 25px 20px; border-bottom: 1px solid #e1e4e8;">
          <p style="margin: 0 0 10px; font-size: 16px;"><strong style="color: #555;">📅 Date:</strong> <span style="color: #666;">${new Date().toLocaleString()}</span></p>
          <p style="margin: 0 0 10px; font-size: 16px;"><strong style="color: #555;">👤 From:</strong> <span style="color: #666;">${senderName}</span></p>
          <p style="margin: 0 0 10px; font-size: 16px;"><strong style="color: #555;">✉️ Email:</strong> <span style="color: #666;">${senderEmail}</span></p>
        </div>
        
        <!-- Message Content -->
        <div style="background-color: white; padding: 25px 20px;">
          <p style="margin: 0 0 15px; font-size: 16px; color: #555; font-weight: 600;">📝 Message:</p>
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 10px; color: #444; font-size: 15px; line-height: 1.6;">
            ${messageContent.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f5f7fa; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            This is an automated notification from your portfolio website contact form.
            <br>You can reply directly to this email to respond to the sender.
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `New Contact Form: ${senderName}`,
      html: adminHtml,
    });

    // Send confirmation to sender
    const senderHtml = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; width: 100%; margin: 0 auto; border: 1px solid #e1e4e8; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); table-layout: fixed;">
        <!-- Header with Logo -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
          <h2 style="color: white; margin: 0; font-weight: 600; font-size: 24px;">Thank You for Your Message</h2>
        </div>
        
        <!-- Confirmation Message -->
        <div style="background-color: white; padding: 30px 20px; text-align: center;">
          <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6; color: #444;">
            I've received your message and will get back to you as soon as possible, usually within 24-48 hours.            
          </p>
          
          <!-- Success Icon -->
          <div style="margin: 25px auto; width: 80px; height: 80px; background-color: #f0faf0; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <div style="width: 40px; height: 40px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Message Summary -->
        <div style="background-color: #f9f9f9; padding: 25px 20px; border-top: 1px solid #e1e4e8;">
          <p style="margin: 0 0 15px; font-size: 16px; color: #555; font-weight: 600;">Your Message:</p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; color: #444; font-size: 15px; line-height: 1.6; word-break: break-word; word-wrap: break-word;">
            ${messageContent.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <!-- Social Links -->
        <div style="background-color: white; padding: 25px 20px; text-align: center; border-top: 1px solid #e1e4e8;">
          <p style="margin: 0 0 15px; font-size: 16px; color: #555;">Connect with me:</p>
          <div>
            <!-- GitHub thumbnail image -->
            <a href="https://github.com/anishgithub890" style="display: inline-block; margin: 0 15px; text-decoration: none; width: 50px; height: 50px;">
              <img src="https://anishmahato.vercel.app/github_thumnail.png" alt="GitHub" style="width: 50px; height: 50px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
            </a>
            
            <!-- LinkedIn thumbnail image -->
            <a href="https://www.linkedin.com/in/anishpabe/" style="display: inline-block; margin: 0 15px; text-decoration: none; width: 50px; height: 50px;">
              <img src="https://anishmahato.vercel.app/linkedin_thumnail.png" alt="LinkedIn" style="width: 50px; height: 50px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f5f7fa; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            © ${new Date().getFullYear()} Anish Mahato | Full Stack Engineer
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      to: senderEmail,
      subject: 'Message Received - Anish Mahato',
      html: senderHtml,
    });
  }
} 