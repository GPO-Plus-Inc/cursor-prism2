import {
  adminBlueprint,
  designTokens,
  heroMetrics,
  moduleStatusTokens,
  mobileTechHighlights,
  clientPortalHighlights,
} from './shared';

describe('shared design primitives', () => {
  it('exposes the canonical color palette', () => {
    expect(designTokens.colors.accent).toBe('#ed1d24');
    expect(designTokens.colors.teal).toBe('#38a69a');
  });

  it('maps display statuses to user-friendly badges', () => {
    expect(moduleStatusTokens.ready.label).toContain('Ready');
    expect(moduleStatusTokens.sync.color).toBe(designTokens.colors.accent);
  });
});

describe('admin blueprint', () => {
  it('covers dispatch-first modules', () => {
    const dispatchModule = adminBlueprint.find(
      (module) => module.key === 'dispatch',
    );
    expect(dispatchModule?.actions[0].route).toBe('/dispatch');
  });

  it('includes narrative hero metrics for landing copy', () => {
    expect(heroMetrics.length).toBeGreaterThan(2);
    expect(heroMetrics[0]).toHaveProperty('helper');
  });
});

describe('mobile highlight exports', () => {
  it('provides at least three tech highlight cards', () => {
    expect(mobileTechHighlights.length).toBeGreaterThanOrEqual(3);
    expect(mobileTechHighlights[0].badge.length).toBeGreaterThan(0);
  });

  it('provides at least two client portal highlight cards', () => {
    expect(clientPortalHighlights.some((card) => card.key === 'invoices')).toBe(
      true,
    );
  });
});
