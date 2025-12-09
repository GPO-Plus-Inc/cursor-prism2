import {
  adminBlueprint,
  appMeta,
  heroMetrics,
  moduleStatusTokens,
} from '@fsm/shared';

import styles from './app.module.css';

export function App() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{appMeta.tagline}</p>
        <div className={styles.heroHeading}>
          <h1>Field Service Command Center</h1>
          <p>{appMeta.description}</p>
        </div>
        <div className={styles.metricsRow}>
          {heroMetrics.map((metric) => (
            <div key={metric.label} className={styles.metricCard}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
              <p className={styles.metricHelper}>{metric.helper}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.modulesSection}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>Operational modules</p>
            <h2>Prism-inspired admin experience</h2>
          </div>
          <p>
            React + Vite shell showcasing the narrative for the FSM stack:
            dispatch, inventory, planograms, offline jobs, integrations, and
            exports ready for ECS-backed delivery.
          </p>
        </div>
        <div className={styles.modulesGrid}>
          {adminBlueprint.map((module) => {
            const status = moduleStatusTokens[module.status];
            return (
              <article key={module.key} className={styles.moduleCard}>
                <span
                  className={styles.statusPill}
                  style={{ backgroundColor: status.color }}
                >
                  {status.label}
                </span>
                <header>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </header>
                <ul className={styles.moduleMetrics}>
                  {module.metrics.map((metric) => (
                    <li key={`${module.key}-${metric.label}`}>
                      <span>{metric.value}</span>
                      <small>{metric.label}</small>
                    </li>
                  ))}
                </ul>
                <p className={styles.statusDetail}>{module.statusDetail}</p>
                <div className={styles.moduleActions}>
                  {module.actions.map((action) => (
                    <button
                      key={`${module.key}-${action.label}`}
                      className={
                        action.emphasis === 'primary'
                          ? styles.primaryAction
                          : styles.secondaryAction
                      }
                      type="button"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
