export const VERIFICATION_EMAIL_TEMPLATE = `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 0;">
      <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4CAF50; font-size: 28px; margin: 0;">Account Verification</h1>
        </div>
        <div style="font-size: 16px; line-height: 1.5; color: #333333;">
          <p>Hello,</p>
          <p>We received a request to verify your email address. Please use the verification code below to complete the process:</p>
          <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; background-color: #f1f1f1; border-radius: 5px; text-align: center; margin: 20px 0;">
            {verificationToken}
          </div>
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 30px;">
          <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export const FORGOT_PASSWORD_EMAIL_TEMPLATE = `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 0;">
      <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2196F3; font-size: 28px; margin: 0;">Reset Your Password</h1>
        </div>
        <div style="font-size: 16px; line-height: 1.5; color: #333333;">
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{resetURL}" style="display: inline-block; background-color: #2196F3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 18px;">
              Reset Password
            </a>
          </div>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>This link will expire in 15 minutes for your security.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 30px;">
          <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;
