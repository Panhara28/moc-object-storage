'use client';

import * as React from 'react';
import * as Recharts from 'recharts';
import { cn } from '@/lib/utils';

const THEMES = { light: '', dark: '.dark' } as const;

/* ----------------------------------------------------------------------------
 * TYPES
 * -------------------------------------------------------------------------- */

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

// This type FIXES Recharts Tooltip typing issues
export interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
  fill?: string;
  [key: string]: unknown;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error('useChart must be inside ChartContainer');
  return ctx;
}

/* ----------------------------------------------------------------------------
 * SAFE PAYLOAD PARSER
 * -------------------------------------------------------------------------- */
function getPayload(entry: TooltipEntry | unknown): Record<string, unknown> | null {
  if (
    typeof entry === 'object' &&
    entry !== null &&
    'payload' in entry
  ) {
    const p = (entry as TooltipEntry).payload;
    if (p && typeof p === 'object') return p as Record<string, unknown>;
  }
  return null;
}

/* ----------------------------------------------------------------------------
 * CHART CONTAINER
 * -------------------------------------------------------------------------- */
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof Recharts.ResponsiveContainer>['children'];
  }
>(function ChartContainer({ id, className, children, config, ...props }, ref) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          'flex aspect-video justify-center text-xs',
          '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
          '[&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50',
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

/* ----------------------------------------------------------------------------
 * CHART STYLE
 * -------------------------------------------------------------------------- */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const rows = Object.entries(config).filter(
    ([_, item]) => item.color || item.theme
  );

  if (!rows.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = rows
        .map(([key, item]) => {
          const c =
            item.theme?.[theme as keyof typeof item.theme] || item.color;
          return c ? `  --color-${key}: ${c};` : '';
        })
        .join('\n');

      return `${prefix} [data-chart=${id}] {\n${vars}\n}`;
    })
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

/* ----------------------------------------------------------------------------
 * TOOLTIP
 * -------------------------------------------------------------------------- */
export const ChartTooltip = Recharts.Tooltip;


type ChartTooltipContentProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  nameKey?: string;
  labelKey?: string;
  indicator?: 'dot' | 'line' | 'dashed';
};

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(function ChartTooltipContent(
  {
    active,
    payload,
    className,
    indicator = 'dot',
    hideIndicator = false,
    nameKey,
  },
  ref
) {
  const { config } = useChart();

  if (!active || !payload || payload.length === 0) return null;

  const items = payload as TooltipEntry[];

  return (
    <div
      ref={ref}
      className={cn(
        'grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs shadow-xl',
        className
      )}
    >
      {items.map((entry, idx) => {
        const raw = getPayload(entry);
        const key = (nameKey || entry.name || entry.dataKey) as string;

        const cfg =
          config[key] ||
          (raw && typeof raw[key] === 'string'
            ? config[raw[key] as string]
            : undefined);

        const color = entry.color || raw?.fill;

        return (
          <div key={idx} className="flex items-center justify-between gap-2">
            {!hideIndicator && (
              <div
                className={cn(
                  'rounded-sm bg-[--bg] border-[--bg]',
                  indicator === 'dot' && 'h-2.5 w-2.5',
                  indicator === 'line' && 'h-1 w-4',
                  indicator === 'dashed' &&
                    'h-1 w-4 border border-dashed bg-transparent'
                )}
                style={{ '--bg': color } as React.CSSProperties}
              />
            )}

            <div className="flex-1 flex justify-between">
              <span className="text-muted-foreground">
                {cfg?.label || entry.name}
              </span>

              {entry.value !== undefined && (
                <span className="font-mono text-foreground">
                  {Number(entry.value).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

/* ----------------------------------------------------------------------------
 * LEGEND
 * -------------------------------------------------------------------------- */
export const ChartLegend = Recharts.Legend;

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  {
    payload?: Array<{ value: string; color: string; dataKey?: string }>;
    hideIcon?: boolean;
    nameKey?: string;
    className?: string;
  }
>(function ChartLegendContent({ payload, hideIcon, nameKey, className }, ref) {
  const { config } = useChart();

  if (!payload || payload.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center gap-4 pt-3', className)}
    >
      {payload.map((entry, i) => {
        const key = (nameKey || entry.dataKey || entry.value) as string;
        const cfg = config[key];

        return (
          <div key={i} className="flex items-center gap-1.5">
            {!hideIcon ? (
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
            ) : null}

            <span>{cfg?.label || entry.value}</span>
          </div>
        );
      })}
    </div>
  );
});
