using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models.Utilities
{
    public static class ListUtilities
    {
        private static Random rng = new((int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds);

        public static void Shuffle<T>(this IList<T> list)
        {
            int n = list.Count;
            for (int i = n - 1; i > 0; i--)
            {
                int j = rng.Next(i + 1);
                T temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
}
