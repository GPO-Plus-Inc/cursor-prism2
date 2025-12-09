import { FormEvent, useState } from 'react';

import styles from '../app.module.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3333/api/v1';

type Provider = 'QuickBooks' | 'Zoho';

type IntegrationForm = {
  provider: Provider;
  fields: { label: string; name: string; placeholder?: string }[];
};

const forms: IntegrationForm[] = [
  {
    provider: 'QuickBooks',
    fields: [
      { label: 'Client ID', name: 'clientId' },
      { label: 'Client Secret', name: 'clientSecret' },
      { label: 'Realm ID', name: 'realmId' },
      { label: 'Access Token', name: 'accessToken' },
    ],
  },
  {
    provider: 'Zoho',
    fields: [
      { label: 'Client ID', name: 'clientId' },
      { label: 'Client Secret', name: 'clientSecret' },
      { label: 'Organization ID', name: 'orgId' },
      { label: 'Access Token', name: 'accessToken' },
    ],
  },
];

export const IntegrationSettings = () => {
  const [status, setStatus] = useState<Record<Provider, string>>({
    QuickBooks: 'disconnected',
    Zoho: 'disconnected',
  });
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleSubmit = async (provider: Provider, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingProvider(provider);
    const formData = new FormData(event.currentTarget);
    const authPayload: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        authPayload[key] = value;
      }
    });

    try {
      const response = await fetch(`${API_BASE}/integrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-org-id': 'demo-org',
        },
        body: JSON.stringify({ provider, authPayload }),
      });
      if (!response.ok) {
        throw new Error('Failed to save credentials');
      }
      setStatus((prev) => ({ ...prev, [provider]: 'connected' }));
    } catch (error) {
      console.error(error);
      setStatus((prev) => ({ ...prev, [provider]: 'error' }));
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <section className={styles.integrationPanel}>
      <div className={styles.integrationHeader}>
        <p className={styles.sectionEyebrow}>Integrations</p>
        <h2>Connect QuickBooks Online & Zoho CRM</h2>
        <p>Store OAuth credentials securely and trigger background sync jobs.</p>
      </div>
      <div className={styles.integrationGrid}>
        {forms.map((form) => (
          <form
            key={form.provider}
            className={styles.integrationCard}
            onSubmit={(e) => handleSubmit(form.provider, e)}
          >
            <header className={styles.integrationCardHeader}>
              <span className={styles.providerPill}>{form.provider}</span>
              <span className={`${styles.statusChip} ${styles[`status-${status[form.provider]}`]}`}>
                {status[form.provider]}
              </span>
            </header>
            {form.fields.map((field) => (
              <label key={field.name} className={styles.fieldBlock}>
                <span>{field.label}</span>
                <input name={field.name} placeholder={field.placeholder} required />
              </label>
            ))}
            <button type="submit" disabled={loadingProvider === form.provider}>
              {loadingProvider === form.provider ? 'Saving…' : 'Save credentials'}
            </button>
          </form>
        ))}
      </div>
    </section>
  );
};
