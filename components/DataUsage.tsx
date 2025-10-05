
import React from 'react';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';

interface DataUsageProps {
  upload: string;
  download: string;
}

const DataUsage: React.FC<DataUsageProps> = ({ upload, download }) => {
  return (
    <div className="flex justify-around items-center bg-slate-900/50 rounded-lg p-3">
      <div className="flex items-center gap-2 text-sm">
        <ArrowDownIcon className="w-5 h-5 text-sky-400" />
        <div>
          <p className="text-slate-400 text-xs">Download</p>
          <p className="font-semibold text-slate-100">{download}</p>
        </div>
      </div>
      <div className="w-px h-8 bg-slate-700"></div>
      <div className="flex items-center gap-2 text-sm">
        <ArrowUpIcon className="w-5 h-5 text-rose-400" />
        <div>
          <p className="text-slate-400 text-xs">Upload</p>
          <p className="font-semibold text-slate-100">{upload}</p>
        </div>
      </div>
    </div>
  );
};

export default DataUsage;
