using System;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;
using facturawebApi.DataModel;




namespace facturawebApi.Common
{

    public class Email
    {
        public Email(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void Send(string emailTo, string subject, string body)
        {
            try
            {

                var appSettingsSection = Configuration.GetSection("EmailSettings");
                string smtpServer = appSettingsSection["server"];
                string smtpPort = appSettingsSection["port"];
                string emailFrom = appSettingsSection["email"];
                string smtpUser = appSettingsSection["user"];
                string smtpPassword = appSettingsSection["password"];
                string ssl = appSettingsSection["ssl"];


                using (var mailMessage = new MailMessage())
                using (var client = new SmtpClient(smtpServer, Int32.Parse(smtpPort)))
                {
                    // configure the client and send the message
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(smtpUser, smtpPassword);
                    client.EnableSsl = bool.Parse(ssl);

                    // configure the mail message
                    mailMessage.From = new MailAddress(emailFrom);
                    mailMessage.To.Insert(0, new MailAddress(emailTo));
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = true;

                    client.Send(mailMessage);
                }

            }
            catch (Exception)
            {
                throw;
            }
        }


    }


}

