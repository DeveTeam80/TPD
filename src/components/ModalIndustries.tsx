// components/ModalIndustries.tsx
'use client'

import IndustryCard from '@/components/IndustryCard'
import { Button } from '@/shared/Button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Divider } from '@/shared/divider'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { BriefcaseIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FC, useState } from 'react'

interface Props {
  industries: any[]
}

const ModalIndustries: FC<Props> = ({ industries }) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="modal-industries">
      <Button type="button" color="white" onClick={() => setIsOpen(true)}>
        <HugeiconsIcon icon={BriefcaseIcon} size={24} />
        <span>Industries</span>
        <ChevronDownIcon className="size-4" />
      </Button>
      <Dialog size="5xl" open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Browse by Industry</DialogTitle>
        <DialogBody>
          <Divider className="my-6" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div key={industry.id} className="aspect-w-4 aspect-h-3">
                <IndustryCard industry={industry} />
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalIndustries