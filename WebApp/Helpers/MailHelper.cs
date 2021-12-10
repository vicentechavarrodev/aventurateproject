using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebApp.Helpers
{
    public class MailHelper
    {
        public MailHelper()
        {

        }

        public static async Task SendMail(string to, string subject, string body)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress("contacto@coaventurate.com"));
            message.From = new MailAddress(to);
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = "contacto@coaventurate.com",
                    Password = "Coaventurate*0202"
                };

                smtp.Credentials = credential;
                smtp.Host = "smtp.tecnoweb.net";
                smtp.Port = 465;
                smtp.EnableSsl = true;
                await smtp.SendMailAsync(message);
            }
        }
    }
}
