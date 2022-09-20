/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-anonymous-default-export */
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/utils/dbConnect';

import User from '../../../models/UserModel';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const user = await User.create({ email: req.body.email });

    sgMail.setApiKey(
      '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'
    );

    const msg = {
      to: req.body.email,
      from: {
        email: 'bartekmnb@wp.pl',
      },
      subject: 'Aktywacja konta klienta',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<table bgcolor="#f2f2f2" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
        <tr>
            <td bgcolor="#f2f2f2" style="background-color: #f2f2f2;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="620">
                    <tbody>
                    <tr>
                        <td style="line-height:0.1em ;" colspan="5" bgcolor="#f2f2f2" height="25">&nbsp;</td>
                    </tr>
                    <tr><td width="25"></td><td height="25" colspan="3" bgcolor="#000000" width="570"></td><td width="25"></td></tr>
                    <tr>
                        <td width="25"></td>
                        <td bgcolor="#000000" width="35"></td>
                        <td style="text-align: center;" align="center" bgcolor="#000000" width="500">
                            <a href="href="http://localhost:3000" title="R-GOL">
                                                            <img src="https://gfx.r-gol.com/media/pub/logo2.png" data-www="www" nh-resize-media=""></a>
                        </td>
                        <td bgcolor="#000000" width="35"></td>
                        <td width="25"></td>
                    </tr>
                    <tr><td width="25"></td><td height="25" colspan="3" bgcolor="#000000" width="570"></td><td width="25"></td></tr>
                    <tr><td width="25"></td><td height="25" colspan="3" bgcolor="#ffffff" width="570"></td><td width="25"></td></tr>
                    <tr>
                        <td width="25"></td>
                        <td bgcolor="#ffffff" width="35"></td>
                        <td style="color: #232323; font-family: Helvetica;font-size: 14px;line-height: 150%;text-align: left;" bgcolor="#ffffff" width="500">
                          
                            <p>Dzień dobry ${req.body.email}, <br></p><p>Dziękujemy za rejestrację w naszym sklepie. W celu aktywacji konta kliknij link: <a rel="noopener noreferrer" target="_blank" href="http://localhost:3000/access/registration_step2/${user._id}">AKTYWUJ KONTO</a></p>
                            <p><br></p>
                            <div>
                                R-GOL.com<br><a href="mailto:eSklep@R-GOL.com" nh-compose-link="">eSklep@R-GOL.com</a><p><span style="font-family: -apple-system, system-ui, BlinkMacSystemFont,">+48 22 122 02 90</span><br>Infolinia czynna:<br>poniedziałek - piątek 8:00-18:00<em></em></p>
                            </div>

                        </td>
                        <td bgcolor="#ffffff" width="35"></td>
                        <td width="25"></td>
                    </tr>
                    <tr><td width="25"></td><td height="25" colspan="3" bgcolor="#ffffff" width="570"></td><td width="25"></td></tr>
                    <tr>
                        <td style="line-height:0.1em ;" colspan="5" height="30">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="2" width="60"></td>
                        <td style="color: #606060;font-family: Helvetica;font-size: 10px;line-height: 125%;text-align: center;" width="500">
                            .
                        </td>
                        <td colspan="2" width="60"></td>
                    </tr>
                    <tr>
                        <td style="line-height:0.1em ;" colspan="5" height="30">&nbsp;</td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>`,
    };
    await sgMail.send(msg).then(
      () => {
        console.log('ass');
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
    return res.status(200).json('zgoda');
  } catch (err) {
    return res.status(400).json({ error: 'Cannot get the User...!' });
  }
};
