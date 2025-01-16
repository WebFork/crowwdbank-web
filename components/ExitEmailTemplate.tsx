import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    startupName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    startupName,
}) => (
    <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#f9fafb',
        padding: '40px 20px',
    }}>
        <div style={{
            background: '#ffffff',
            padding: '40px',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
            <img
                src="https://example.com/your-logo.png"
                alt="LaunchVest"
                style={{
                    height: '32px',
                    marginBottom: '24px',
                }}
            />

            <h1 style={{
                color: '#111827',
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '24px',
            }}>
                Startup Exit Confirmation
            </h1>

            <p style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '24px',
            }}>
                Hi {firstName},
            </p>

            <p style={{
                color: '#374151',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '24px',
            }}>
                We&apos;ve just deposited your funds from {startupName} into your bank account.
            </p>

            <div style={{
                background: '#f3f4f6',
                padding: '24px',
                borderRadius: '6px',
                marginBottom: '24px',
            }}>

                <p style={{
                    color: '#374151',
                    fontSize: '16px',
                    lineHeight: '24px',
                    marginBottom: '32px',
                }}>
                    You can view your complete investment history and performance in your dashboard.
                </p>

                <div style={{
                    textAlign: 'center' as const,
                }}>
                    <a
                        href="https://envi.wfrk.live/dashboard"
                        style={{
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'inline-block',
                        }}
                    >
                        View Dashboard
                    </a>
                </div>

                <div style={{
                    marginTop: '48px',
                    padding: '24px 0 0',
                    borderTop: '1px solid #e5e7eb',
                    textAlign: 'center' as const,
                    color: '#6b7280',
                    fontSize: '14px',
                }}>
                    <p style={{ marginBottom: '12px' }}>
                        Crowwd Bank - Democratizing Startup Investment
                    </p>
                    <p>
                        © 2025 Crowwd Bank. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </div>
);
