import {ReactNode, useMemo} from 'react';
import {RecoilRoot} from 'recoil';
import {layoutPlugin} from 'components/Layout/plugin';
import {pageBreakPlugin} from 'components/PageBreak/plugin';
import idGenerator from 'core/idGenerator';
import debugHelper from 'core/debugHelper';
import type {ReportPlugin} from 'core/engine/plugin';
import RecoilDebugger from 'components/RecoilDebugger';
import {OptionContext} from './optionContext';
import ReadyForPrintStatus from 'components/ReadyForPrintStatus';

import './styles.css';


export interface ReportRootProps {
  children: ReactNode;
  plugins?: ReportPlugin[];
}

function ReportRoot({children, plugins}: ReportRootProps) {
  const options = useMemo(
    () => ({
      idGenerator: idGenerator(),
      plugins: [pageBreakPlugin, layoutPlugin, ...(plugins ?? [])],
    }),
    [plugins],
  );

  return (
    <RecoilRoot>
      {debugHelper.activateDebuggers && <RecoilDebugger />}     
      <OptionContext.Provider value={options}>
        {children}
      </OptionContext.Provider>
      <ReadyForPrintStatus/>
    </RecoilRoot>
  );
}

export default ReportRoot;
