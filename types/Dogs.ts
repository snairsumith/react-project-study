export type Dog = {
        id: string;
        type: string;
        attributes: {
            name: string;
            description: string;
            life: {
                max: number;
                min: number;
            };
        },
        relationships: {
          group: {
            data: {
              id: string;
              type: string;
            };
          };
        };
        country?: string;
    }[];

